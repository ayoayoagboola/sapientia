import { db } from "@/db";
import { users, wordForms, words } from "@/schema";
import { eq } from "drizzle-orm";

// words

export const getWordId = async (lemma: string) => {
  try {
    const word = await db.query.words.findFirst({
      where: eq(words.word, lemma),
    });
    if (word) {
      return word.id;
    }
  } catch (error) {
    error: "database error";
  }
};

export const getWordForms = async (lemma: string) => {
  const wordId = await getWordId(lemma);

  if (wordId) {
    try {
      const forms = await db.query.wordForms.findMany({
        where: eq(wordForms.wordId, wordId),
      });
      if (forms) {
        return forms;
      }
    } catch (error) {
      error: "database error";
    }
  }
};

// user

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (user) {
      return user;
    }
  } catch (error) {
    return { error: "Unauthorized" };
  }
};
