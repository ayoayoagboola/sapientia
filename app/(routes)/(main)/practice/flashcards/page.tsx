"use client";

import { trpc } from "@/app/_trpc/client";
import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const FlashCardsPage = () => {
  const { data, isLoading, error } =
    trpc.flashcards.getFlashCardSets.useQuery();

  if (!data) return;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle errors
  if (error) {
    console.error("Error:", error.message);
    return <div>Error: {error.message}</div>;
  }

  if ("error" in data) {
    return <div>Error: {data.error}</div>;
  }

  // If there is no data or no sets
  if (!data || !data.sets || data.sets.length === 0) {
    return <div>No flashcard sets found.</div>;
  }

  console.log("Fetched sets:", data.sets); // Debug log

  return (
    <div>
      <div className="flex w-full h-full p-16">
        {data.sets.map((set) => (
          <Link href={`/practice/flashcards/${set.id}`} key={set.id}>
            <Card>{set.title}</Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlashCardsPage;
