import { set, z } from "zod";

import { protectedProcedure, router } from "@/server/trpc";
import { CreateFlashCardSetSchema, EditFlashCardSetSchema } from "@/schemas";
import { db } from "@/db";
import { getFlashCardSets } from "@/db/queries";
import { and, eq, sql } from "drizzle-orm";
import {
  flashcards,
  flashcardSetRelations,
  flashcardSets,
  wordForms,
} from "@/schema";
import { auth } from "@/auth";

// TODO: fix edit procedure: allow new cards when editing 

export const flashCardRouter = router({
  getFlashCardSets: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.user?.id;
      if (!userId) {
        return { error: "Unauthorized" };
      }

      const sets = await ctx.db.query.flashcardSets.findMany({
        with: {
          cards: true,
          user: true,
        },
        where: eq(flashcardSets.userId, userId),
      });

      return { sets }; // Returning sets when the query is successful
    } catch (error) {
      console.error("Error fetching sets:", error);
      return { error: "Failed to fetch flashcards" }; // Return a consistent error structure
    }
  }),

  getFlashCardSet: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const set = await db.query.flashcardSets.findFirst({
          with: {
            cards: true,
          },
          where: eq(flashcardSets.id, input.id),
        });
        return set;
      } catch (error) {
        return { error: "Flashcard set not found." };
      }
    }),

  createFlashCardSet: protectedProcedure
    .input(
      z.object({
        set: CreateFlashCardSetSchema,
      })
    )
    .mutation<Promise<string | { error: string }>>(async ({ ctx, input }) => {
      try {
        const userId = ctx.user?.id;
        if (!userId) {
          return { error: "Unauthorized" };
        }

        const [flashCardSet] = await db
          .insert(flashcardSets)
          .values({
            userId: userId,
            title: input.set.title,
            description: input.set.description,
          })
          .returning({ setId: flashcardSets.id });

        for (const card of input.set.cards) {
          await db.insert(flashcards).values({
            userId: userId,
            setId: flashCardSet.setId,
            term: card.term,
            definitions: card.definitions.split(", "),
            starred: false,
          });
        }

        // Return the created setId
        return flashCardSet.setId;
      } catch (error) {
        return { error: "Could not create flashcard set" };
      }
    }),

  editFlashCardSet: protectedProcedure
    .input(
      z.object({
        set: EditFlashCardSetSchema,
      })
    )
    .mutation(async ({ input }) => {
      try {
        await db
          .update(flashcardSets)
          .set({
            title: input.set.title,
            description: input.set.description,
          }).where(eq(flashcardSets.id, input.set.id))

        for (const card of input.set.cards) {
          await db.update(flashcards).set({
            term: card.term,
            definitions: card.definitions,
          }).where(eq(flashcards.id, card.id));
        }
      } catch (error) {
        return { error: "Could not create flashcard set" };
      }
    }),

  editFlashCard: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        term: z.string(),
        definitions: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await db
          .update(flashcards)
          .set({
            term: input.term,
            definitions: input.definitions.split(", "),
          })
          .where(eq(flashcards.id, input.id));
      } catch (error) {
        return { error: "Could not create flashcard set" };
      }
    }),

  deleteFlashCardSet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .delete(flashcardSets)
          .where(eq(flashcardSets.id, input.id));
      } catch (error) {
        console.error("Error fetching sets:", error);
        return { error: "Failed to delete flashcards" }; // Return a consistent error structure
      }
    }),
});
