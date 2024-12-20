"use client";

import { trpc } from "@/app/_trpc/client";
import FlashCard from "@/components/practice/flashcards/FlashCard";
import React, { use } from "react";

// TODO: fix styling 

interface FlashCardPageProps {
  params: Promise<{ flashcardId: string }>;
}

const FlashCardPage = ({ params }: FlashCardPageProps) => {
  const setId = use(params).flashcardId;
  const {
    data: set,
    isLoading,
    error,
  } = trpc.flashcards.getFlashCardSet.useQuery({
    id: setId,
  });

  if (!set) return;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle errors
  if (error) {
    console.error("Error:", error.message);
    return <div>Error: {error.message}</div>;
  }

  if ("error" in set) {
    return <div>Error: {set.error}</div>;
  }

  // If there is no set or no sets
  if (!set) {
    return <div>No flashcard sets found.</div>;
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-4">
      <div className="flex flex-col h-full gap-4 items-center justify-start p-16">
        <h3 className="font-medium">{set.title}</h3>
        {set && <FlashCard set={set as FlashCardSet} />}
        <div className="flex flex-col w-full gap-4 items-center justify-center">
          <h4 className="w-full text-start font-medium">
            Terms in this set ({set.cards.length})
          </h4>
          {set.cards.map((card) => (
            <div
              className="flex w-full h-full p-3 gap-8 border border-slate-200 rounded-lg"
              key={card.id}
            >
              <div>{card.term}</div>
              <div className="w-px h-full bg-slate-300" />
              <div>{card.definitions}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashCardPage;
