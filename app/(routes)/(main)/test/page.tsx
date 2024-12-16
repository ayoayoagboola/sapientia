"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { splitAndUpload } from "@/utils/word-forms";
import React, { useTransition } from "react";

const TestPage = () => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    try {
      startTransition(async () => {
        console.log("Loading word forms...");
        const wordFormsData = await splitAndUpload(
          "quinct.txt",
          "classical_texts"
        ); // Update the path to your JSON file

        console.log("Word forms successfully inserted!");
      });
    } catch (error) {
      console.error("Error inserting word forms:", error);
    }
  };

  return (
    <div>
      <Button onClick={onSubmit}>dfg</Button>
    </div>
  );
};

export default TestPage;
