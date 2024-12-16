import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

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
                <div className="flashcard-front w-[500px] h-[340px]">
                  <Card className="flex w-[500px] h-[340px] items-center justify-center rounded-[20px]">
                    {card.term}
                  </Card>
                </div>
                {/* Back of the card */}
                <div className="flashcard-back w-[500px] h-[340px]">
                  <Card className="flex w-[500px] h-[340px] items-center justify-center rounded-[20px]">
                    {card.definitions}
                  </Card>
                </div>
              </div>
              {/* <Card className="flashcard-content">{card.definitions}</Card>  back of card */}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button className="w-8 h-8" variant={"soft_outline"} onClick={goToPrevious}>
          <ArrowLeft />
        </Button>
        <p>{currentIndex + 1 + "/" + set.cards.length}</p>
        <Button className="w-8 h-8" variant={"soft_outline"} onClick={goToNext}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default FlashCard;
