"use client";

import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import { trpc } from "@/app/_trpc/client";
import { GalleryVerticalEnd } from "lucide-react";
import FlashCardButton from "./practice/flashcards/FlashCardButton";
import { buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";


// TODO: fix some styling 

const UserFlashcardList = () => {
  // just testing
  const {
    data: flashCardSets,
    isLoading,
    error,
  } = trpc.flashcards.getFlashCardSets.useQuery();

  if (!flashCardSets) return;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle errors
  if (error) {
    console.error("Error:", error.message);
    return <div>Error: {error.message}</div>;
  }

  if ("error" in flashCardSets) {
    return <div>Error: {flashCardSets.error}</div>;
  }

  // If there is no flashCardSets or no sets
  if (
    !flashCardSets ||
    !flashCardSets.sets ||
    flashCardSets.sets.length === 0
  ) {
    return <div>No flashcard sets found.</div>;
  }

  return (
    <div className="flex flex-col w-full gap-4 p-6 border border-slate-200 rounded-[20px]">
      <div className="flex w-full h-full items-center justify-between">
        <h3 className="font-medium">Your Flashcards</h3>
        {/* <Link className={buttonVariants({ variant: "default"})} href="/practice/flashcards/create">Create</Link> */}
        <Link
          className={buttonVariants({ variant: "ghost" })}
          href="/practice/flashcards"
        >
          See all
        </Link>
      </div>
      <div className="flex w-full h-full gap-4 items-center justify-center">
        {flashCardSets.sets.map((set) => (
          <Link
            className="w-64 h-36"
            href={`/practice/flashcards/${set.id}`}
            key={set.id}
          >
            <Card
              key={set.id}
              className="flex flex-col w-64 h-36 p-3 items-start justify-between rounded-[20px] hover:shadow-[8px_8px_0px_rgba(27,32,42,1)] hover:translate-x-[-8px] hover:translate-y-[-8px] transition-all"
            >
              <div className="flex flex-col items-start justify-center w-full gap-y-1.5">
                <div className="flex w-full items-center justify-between">
                  <p className="font-medium text-sm">{set.title}</p>
                  <FlashCardButton id={set.id} />
                </div>
                <Badge className="gap-x-1" variant={"secondary"}>
                  <GalleryVerticalEnd size={12} />
                  {set.cards.length + " terms"}
                </Badge>
              </div>
              <div className="flex w-full gap-2 items-center justify-start">
                {/* <Image
                    className="rounded-full"
                    src={`${set.user.image}`}
                    alt={"User image"}
                    width={30}
                    height={30}
                  />
                  <p className="text-sm font-medium">{set.user.name}</p> */}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserFlashcardList;
