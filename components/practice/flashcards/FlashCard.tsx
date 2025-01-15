"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserIcon from "@/components/user/UserIcon";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, PencilLine, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LearnDialog from "./LearnDialog";

// TODO: edit some styles

interface FlashCardProps {
  set: FlashCardSet;
}
const FlashCard = ({ set }: FlashCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedStates, setFlippedStates] = useState<boolean[]>(
    new Array(set.cards.length).fill(false) // Initialize all cards as not flipped
  );

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + set.cards.length) % set.cards.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % set.cards.length);
  };

  const toggleFlip = (index: number) => {
    setFlippedStates((prev) => {
      const newFlippedStates = [...prev];
      newFlippedStates[index] = !newFlippedStates[index]; // Toggle flip state for the clicked card
      return newFlippedStates;
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flashcard-list-wrapper">
        {set.cards.map((card, index) => {
          const offset =
            (index - currentIndex + set.cards.length) % set.cards.length;

          // Only render the current, next, and previous cards
          if (offset !== 0 && offset !== 1 && offset !== set.cards.length - 1) {
            return null; // Do not render this card
          }

          return (
            <div
              key={card.id}
              className={`flashcard-wrapper ${
                offset === 0
                  ? "current"
                  : offset === 1
                  ? "next"
                  : offset === set.cards.length - 1
                  ? "previous"
                  : "hidden"
              }`}
            >
              <div
                className={`flashcard-content-wrapper ${
                  flippedStates[index] ? "flipped" : ""
                }`}
                onClick={() => toggleFlip(index)}
              >
                {/* Front of the card */}
                <div className="flashcard-front w-[660x] h-[448px]">
                  <Card className="flex w-[660px] h-[448px] items-center justify-center font-medium text-xl rounded-[20px]">
                    {card.term}
                  </Card>
                </div>
                {/* Back of the card */}
                <div className="flashcard-back w-[660px] h-[448px]">
                  <Card className="flex w-[660px] h-[448px] items-center justify-center font-medium text-xl rounded-[20px]">
                    {card.definitions}
                  </Card>
                </div>
              </div>
              {/* <Card className="flashcard-content">{card.definitions}</Card>  back of card */}
            </div>
          );
        })}
      </div>
      <div className="flex w-full items-center justify-between my-4">
        <div className="flex flex-col gap-1 items-start justify-center text-sm font-medium">
          {/* Created by:
          <UserIcon userId={set.userId} withName /> */}
          <Link
            href={`/practice/flashcards/${set.id}/learn`}
            className={buttonVariants({ variant: "default" })}
          >
            <Play />
            Learn
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            className="w-8 h-8"
            variant={"soft_outline"}
            onClick={goToPrevious}
          >
            <ArrowLeft />
          </Button>
          <p>{currentIndex + 1 + "/" + set.cards.length}</p>
          <Button
            className="w-8 h-8"
            variant={"soft_outline"}
            onClick={goToNext}
          >
            <ArrowRight />
          </Button>
        </div>
        <div>
          <Link
            className={cn("w-8 h-8", buttonVariants({ variant: "ghost" }))}
            href={`/practice/flashcards/edit/${set.id}`}
          >
            <PencilLine />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
