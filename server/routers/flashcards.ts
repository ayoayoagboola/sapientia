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
import { revalidatePath } from "next/cache";

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
            isCustom: true,
          })
          .returning({ setId: flashcardSets.id });

        for (const card of input.set.cards) {
          await db.insert(flashcards).values({
            userId: userId,
            setId: flashCardSet.setId,
            term: card.term,
            definitions: card.definitions,
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
        // Update the flashcard set
        await db
          .update(flashcardSets)
          .set({
            title: input.set.title,
            description: input.set.description,
          })
          .where(eq(flashcardSets.id, input.set.id));

        // Update existing cards
        for (const card of input.set.cards) {
          if (card.id) {
            // Existing card, update it
            await db
              .update(flashcards)
              .set({
                term: card.term,
                definitions: card.definitions,
              })
              .where(eq(flashcards.id, card.id));
          } else {
            // New card, insert it
            await db.insert(flashcards).values({
              term: card.term,
              definitions: card.definitions,
              setId: input.set.id,
              starred: false, // Assuming you have a foreign key linking cards to a set
            });
          }
        }

        return { success: true };
      } catch (error) {
        return { error: "Could not update flashcard set" };
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
            definitions: input.definitions,
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

  togglePin: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      if (!ctx.user || !ctx.user.id) {
        return { error: "You need to be logged in to pin the set!" };
      }

      try {
        const set = await ctx.db.query.flashcardSets.findFirst({
          where: eq(flashcardSets.id, id),
        });

        if (!set) return { error: "No set!" };

        await ctx.db
          .update(flashcardSets)
          .set({
            isPinned: !set.isPinned,
          })
          .where(eq(flashcardSets.id, set.id));

        const currentPath = ctx.req.url;

        if (currentPath) {
          revalidatePath(currentPath);
        }
        return { success: "Flashcard set pinned!" };
      } catch (error) {
        console.log(error);
        return { error: "Could not pin set!" };
      }
    }),
});
