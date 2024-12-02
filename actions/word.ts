"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { wordForms, words } from "@/schema";
import { getWordId } from "@/db/queries";

// TODO: efficiency!

export const insertWord = async (lemma: string) => {
  try {
    await db.insert(words).values({
      word: lemma,
    });
  } catch (error) {
    error: "database error";
  }
};

export const insertWordForms = async (
  lemma: string,
  forms: WordFormsData,
) => {
  const wordId = await getWordId(lemma);

  if (!wordId) {
    return { error: "Unable to find word" };
  }

  // Iterate over the forms (which is a map, not an array)
  for (const [form, attributesList] of Object.entries(forms)) {
    // attributesList is an array of WordForm objects for the specific form
    for (const attributes of attributesList) {
      // Now insert each word form entry
      try {
        await db.insert(wordForms).values({
          wordId,
          lemma,
          form,  // 'form' is the key in the map (e.g., 'nominative', 'genitive')
          ...attributes,  // attributes corresponds to other columns like 'pos', 'person', etc.
        });
      } catch (error) {
        console.error("Database error:", error);
      }
    }
  }
};



export const insertWordForm = async (lemma: string, data: WordFormsData) => {
  const rowsToInsert = [];

  for (const [form, attributesList] of Object.entries(data)) {
    for (const attributes of attributesList) {
      rowsToInsert.push({
        lemma,
        form,
        ...attributes,
      });
    }
  }

  await db.insert(wordForms).values(rowsToInsert);
  console.log(`Inserted ${rowsToInsert.length} rows for lemma ${lemma}`);
};
