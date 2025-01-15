"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/text-area";
import { Pencil, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import EditFlashCardDialog from "./EditFlashCardDialog";

interface LearnCardProps {
  set: {
    cards: FlashCard[];
  };
  rounds: number;
  questionType: string;
}

interface FormData {
  answers: { [key: string]: string }; // Stores answers keyed by card index
}

interface Result {
  card: FlashCard;
  userAnswer: string;
  isCorrect: boolean;
}

const LearnCard = ({ set, rounds, questionType }: LearnCardProps) => {
  const { register, handleSubmit, resetField } = useForm();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [results, setResults] = useState<
    {
      term: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }[]
  >([]);

  const currentCard = set.cards[currentIndex];

  const onSubmit = (data: any) => {
    const userAnswer = data.answer?.trim().toLowerCase();
    const correctAnswer = currentCard.definitions.trim().toLowerCase();
    const isCorrect = userAnswer === correctAnswer;

    setResults((prev) => [
      ...prev,
      {
        term: currentCard.term,
        userAnswer: data.answer || "No answer",
        correctAnswer: currentCard.definitions,
        isCorrect,
      },
    ]);

    setIsAnswerCorrect(isCorrect);
    setHasAnswered(true);
  };

  const moveToNextCard = () => {
    if (currentIndex + 1 <= rounds) {
      setCurrentIndex((prev) => prev + 1);
      setHasAnswered(false);
      setIsAnswerCorrect(null);
      resetField("answer");
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setResults([]);
    setHasAnswered(false);
    setIsAnswerCorrect(null);
    resetField("answer");
  };

  if (currentIndex >= rounds) {
    return <SessionComplete results={results} onRestart={handleRestart} />;
  }

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <Card className="flex flex-col w-full h-full items-center justify-between rounded-3xl p-8">
          <div className="flex flex-col w-full gap-8">
            <div className="flex w-full items-center justify-between">
              <div className="font-semibold">Term</div>
              <div className="flex gap-2">
                <EditFlashCardDialog
                  id={currentCard.id}
                  term={currentCard.term}
                  definitions={currentCard.definitions}
                >
                  <Button variant={"soft_outline"} className="h-9 w-9">
                    <Pencil />
                  </Button>
                </EditFlashCardDialog>
                <Button variant={"soft_outline"} className="h-9 w-9">
                  <Star />
                </Button>
              </div>
            </div>
            <div>{currentCard.term}</div>
          </div>
          <div className="flex flex-col w-full items-start justify-between gap-3">
            <div className="font-medium">
              Answer to the best of your ability
            </div>
            <div className="flex w-full items-center justify-center gap-3">
              <>
                {hasAnswered ? (
                  <div
                    className={`${
                      isAnswerCorrect ? "bg-green-200" : "bg-red-200"
                    } w-full rounded-2xl resize-none text-left text-base items-center justify-center overflow-hidden py-4 px-3 }`}
                  >
                    {isAnswerCorrect ? (
                      <span className="text-green-900">Correct!</span>
                    ) : (
                      <span className="text-red-900">
                        Incorrect! The correct answer is:{" "}
                        {currentCard.definitions}
                      </span>
                    )}
                  </div>
                ) : (
                  <Textarea
                    rows={1}
                    className="w-full rounded-2xl border-slate-900 resize-none text-left text-base items-center justify-center overflow-hidden py-4 px-3"
                    placeholder="Press (Shift + Enter) for multi-line answers"
                    {...register("answer", { required: true })}
                  />
                )}
              </>
              {hasAnswered && currentIndex + 1 <= rounds ? (
                <Button
                  onClick={moveToNextCard}
                  className="h-[60px] rounded-2xl"
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" className="h-[60px] rounded-2xl">
                  Answer
                </Button>
              )}
            </div>
          </div>
        </Card>
      </form>
      <div className="flex justify-between mt-4">
        <p>{`Round ${currentIndex + 1} of ${rounds}`}</p>
      </div>
    </div>
  );
};

const SessionComplete = ({
  results,
  onRestart,
}: {
  results: {
    term: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
  onRestart: () => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Session Complete!</h2>
      <div className="space-y-4 mt-6">
        {results.map((result, index) => (
          <Card key={index} className="p-4">
            <h3 className="font-semibold">Card {index + 1}</h3>
            <p>
              <strong>Term:</strong> {result.term}
            </p>
            <p>
              <strong>Your Answer:</strong> {result.userAnswer}
            </p>
            <p>
              <strong>Correct Answer:</strong> {result.correctAnswer}
            </p>
            <p
              className={`font-bold ${
                result.isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {result.isCorrect ? "Correct" : "Incorrect"}
            </p>
          </Card>
        ))}
      </div>
      <Button onClick={onRestart} className="mt-4">
        Restart
      </Button>
    </div>
  );
};

export default LearnCard;
