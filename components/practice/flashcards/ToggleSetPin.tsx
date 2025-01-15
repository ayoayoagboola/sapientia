"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Pin } from "lucide-react";
import React from "react";

interface ToggleSetPinProps {
  set: FlashCardSet;
}

// added ToggleSetPin (rename it lol)

const ToggleSetPin = ({ set }: ToggleSetPinProps) => {
  const togglePin = trpc.flashcards.togglePin.useMutation({});

  return (
    <Button
      className="relative aspect-square p-0.5"
      variant={"ghost"}
      onClick={() => {togglePin.mutate({ id: set.id })}}
    
   >
      <Pin fill={`${set.isPinned ? "#1b202a" : "none"}`} />
    </Button>
  );
};

export default ToggleSetPin;
