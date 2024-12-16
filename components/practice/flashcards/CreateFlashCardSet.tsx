"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreateFlashCardSetSchema } from "@/schemas";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import CreateFlashCard from "./CreateFlashCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/text-area";
import { SquarePen } from "lucide-react";

// TODO: add some tips + searching for words

type CreateFlashCardSetValues = z.infer<typeof CreateFlashCardSetSchema>;

const CreateFlashCardSet = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cards",
  });

  return (
    <div className="flex flex-col w-full h-full items-center justify-start gap-5">
      <Card
        variant="no_padding"
        className="flex flex-col w-[750px] h-[200px] gap-0 justify-start border-slate-900 rounded-[20px]"
      >
        <div className="w-full px-4 py-1 border-b border-b-slate-900">
          <Input
            placeholder='Title - (like "1st Declension Nouns Practice")'
            className="w-full !p-0 !border-0 !font-medium !text-xl focus:outline-0"
            {...register("title")}
          />
        </div>
        <div className="w-full h-full px-4 py-3">
          <Textarea
            placeholder="Write a description..."
            className="w-full h-full !p-0 !border-none !text-base !font-normal focus:outline-none resize-none"
            {...register("description")}
          />
        </div>
      </Card>

      <div className="space-y-6">
        {fields.map((item, index) => (
          <CreateFlashCard
            index={index}
            key={item.id}
            removeCard={() => remove(index)}
          />
        ))}
        <div className="flex flex-col w-[750px] h-[150px] gap-0 items-center justify-center border border-dashed border-slate-400 hover:border-slate-900 rounded-[20px] transition-colors" onClick={() => append({ term: "", definitions: "" })}>
            <SquarePen />
            Add a card...
        </div>
      </div>
    </div>
  );
};

export default CreateFlashCardSet;
