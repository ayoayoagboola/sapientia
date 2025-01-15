"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/text-area";
import { importFlashcardsFromText } from "@/utils/import-flashcards";
import React, { useState } from "react";

interface ImportFlashcardsProps {
  append: (value: { term: string; definitions: string }) => void;
}

// add more delimiters (commas, semicolons, \n, etc.)

const ImportFlashcards = ({ append }: ImportFlashcardsProps) => {
  const [importText, setImportText] = useState("");

  // Import flashcards when user submits the dialog
  const handleImportFlashcards = () => {
    console.log(importText)
    importFlashcardsFromText(importText, append);
    setImportText(""); // Clear the textarea after import
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"soft_outline"}>Import</Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] p-6 bg-slate-50 rounded-lg shadow-lg">
        <DialogTitle>Import Flashcards</DialogTitle>
        <DialogDescription>
          Paste your terms and definitions, separated by tabs, into the text area below.
        </DialogDescription>

        <Textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste terms and definitions here"
          className="w-full h-[150px] !p-2 !border-none !text-base !font-normal focus:outline-none resize-none"
        />

        <div className="flex justify-between mt-4">
          <DialogClose asChild>
            <Button variant="soft_outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleImportFlashcards}>Import</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportFlashcards;
