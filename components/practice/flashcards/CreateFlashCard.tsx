"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GripVertical, Trash2 } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "motion/react";

// TODO: fix some styling + animations 

interface CreateFlashCardProps {
  index: number;
  removeCard: () => void;
}

const CreateFlashCard = ({ index, removeCard }: CreateFlashCardProps) => {
  const { register, setValue, getValues } = useFormContext();

  const handleCharacterClick = (field: string, char: string) => {
    // Get current value of the field and append the character
    const currentValue = (getValues(`cards.${index}.${field}`) || "") as string;
    setValue(`cards.${index}.${field}`, currentValue + char);
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
      }}
    >
      <Card
        variant="no_padding"
        className="flex flex-col w-[750px] gap-0 justify-start border-slate-900 rounded-[20px]"
      >
        <div className="flex w-full px-4 py-2 border-b border-b-slate-900 justify-between items-center">
          <p className="font-semibold text-xl">{index + 1}</p>
          <div className="flex">
            <Button variant="ghost" className="p-2">
              <GripVertical />
            </Button>
            <Button variant="ghost" className="p-2" onClick={removeCard}>
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className="flex w-full items-center justify-between px-8 pt-8 gap-8">
          <Input
            placeholder="Enter Latin"
            className="!w-full !p-0 !border-0 !border-b !border-b-slate-900 !font-normal !text-base focus:outline-0 !rounded-none"
            {...register(`cards.${index}.term`)}
          />
          <Input
            placeholder="Enter English"
            className="!w-full !p-0 !border-0 !border-b !border-b-slate-900 !font-normal !text-base focus:outline-0 !rounded-none"
            {...register(`cards.${index}.definitions`)}
          />
        </div>
        <div className="flex w-full h-14 gap-2 pl-28 items-center">
          {["ā", "ē", "ī", "ō", "ū"].map((char) => (
            <Button
              key={char}
              className="p-0 w-8 h-8 text-sm"
              variant="ghost"
              onClick={() => handleCharacterClick("term", char)} // For appending to the term
            >
              {char}
            </Button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default CreateFlashCard;
