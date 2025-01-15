"use client";

import { trpc } from "@/app/_trpc/client";
import LearnCard from "@/components/practice/flashcards/LearnCard";
import LearnDialog from "@/components/practice/flashcards/LearnDialog";
import React, { use, useState } from "react";

// TODO: fix dialog + styling 

interface LearnPageProps {
  params: Promise<{ flashcardId: string }>;
}

const LearnPage = ({ params }: LearnPageProps) => {
  const setId = use(params).flashcardId;
  const {
    data: set,
    isLoading,
    error,
  } = trpc.flashcards.getFlashCardSet.useQuery({
    id: setId,
  });

  const [rounds, setRounds] = useState(0);
  const [questionType, setQuestionType] = useState("");
  const [started, setStarted] = useState(false);

  const onStartLearning = (rounds: number, questionType: string) => {
    setRounds(rounds);
    setQuestionType(questionType);
    setStarted(true);
  };

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
    <div className="flex w-full h-full items-center justify-center p-16">
      {!started ? (
        <LearnDialog
          set={set as FlashCardSet}
          onStartLearning={onStartLearning}
        />
      ) : (
        <LearnCard
          set={set as FlashCardSet}
          rounds={rounds}
          questionType={questionType}
        />
      )}
    </div>
  );
};

export default LearnPage;
