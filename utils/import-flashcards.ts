// utils/importFlashcards.ts

import { UseFormSetValue, FieldValues } from "react-hook-form";

// added importFlashcardsFromText

export const importFlashcardsFromText = (
  importText: string,
  append: (value: { term: string; definitions: string }) => void
) => {
  const lines = importText.split("\n");
  const newCards = lines.map((line) => {
    const [term, definition] = line.split("\t"); // Split by tab character
    return {
      term: term?.trim() || "",
      definitions: definition?.trim() || "",
    };
  });
  
  // Append parsed flashcards to form
  newCards.forEach((card) => append(card));
};

