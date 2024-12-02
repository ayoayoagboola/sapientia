import { z } from "zod";

import { publicProcedure, router } from "@/server/trpc";
import { WordFormSchema } from "@/schemas";
import { db } from "@/db";
import { getWordId } from "@/db/queries";
import { and, eq, sql } from "drizzle-orm";
import { wordForms } from "@/schema";

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
          return null
        } else {
          return form;
        }
      }
    }),
});
