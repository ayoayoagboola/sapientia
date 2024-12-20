"use client";

import { trpc } from "@/app/_trpc/client";
import FlashCardButton from "@/components/practice/flashcards/FlashCardButton";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserFlashcardList from "@/components/UserFlashcardList";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";

// TODO: add dashboard functionality; flashcard sets ✅, previous sessions, etc.

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full p-8 gap-4">
      <h2 className="font-semibold">Dashboard</h2>
      <UserFlashcardList />
    </div>
  );
};

export default DashboardPage;
