import { z } from "zod";

import { publicProcedure, router } from "@/server/trpc";
import { WordFormSchema } from "@/schemas";
import { db } from "@/db";
import { getWordId } from "@/db/queries";
import { and, eq, ilike, sql } from "drizzle-orm";
import { wordForms, words } from "@/schema";

// TODO: improve searchWords procedure; implement pos filtering 

export const wordRouter = router({
  getWordForms: publicProcedure
    .input(
      z.object({
        lemma: z.string(),
      })
    )
    .query(async ({ input }) => {
      const wordId = await getWordId(input.lemma);
      if (wordId) {
        const forms = await db.query.wordForms.findMany({
          where: eq(wordForms.wordId, wordId),
        });

        return forms;
      }
    }),

  getWordForm: publicProcedure
    .input(
      z.object({
        lemma: z.string(),
        form: WordFormSchema,
      })
    )
    .query(async ({ input }) => {
      const wordId = await getWordId(input.lemma);

      if (wordId) {
        const formConditions = Object.entries(input.form).map(
          ([key, value]) =>
            sql`${wordForms[key as keyof typeof wordForms]} = ${value}`
        );

        const form = await db.query.wordForms.findFirst({
          where: and(eq(wordForms.wordId, wordId), ...formConditions),
        });

        if (form == undefined) {
          return null;
        } else {
          return form;
        }
      }
    }),

  searchWords: publicProcedure
    .input(
      z.object({
        term: z.string(),
        pos: z.string(),
      })
    ) // Expecting a string directly as input
    .query(async ({ input }) => {
      console.log("Backend received query:", input); // Log the query to ensure it's being passed correctly

      const searchQuery = input.term.toLowerCase(); // Ensure case-insensitive search
      console.log("Processed search query:", searchQuery);

      try {
        const results = await db.query.words
          .findMany({
            where: and(
              ilike(words.word, searchQuery + "%"),
              eq(words.pos, input.pos)
            ),
            limit: 5, // Limit the results to 5 items for performance
          })
          .then((lemmas) => lemmas.map((lemma) => lemma.word)); // Extract the word from the result

        console.log("Found lemmas:", results); // Log the search results

        return results; // Return the results to the client
      } catch (error) {
        console.error("Error while searching for words:", error); // Log the error
        return []; // Return an empty array in case of an error
      }
    }),
});
