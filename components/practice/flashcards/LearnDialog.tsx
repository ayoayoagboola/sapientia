"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Play } from "lucide-react";
import React, { useState } from "react";

interface LearnDialogProps {
  set: FlashCardSet;
  onStartLearning: (rounds: number, questionType: string) => void; // Callback to pass the data
}

const LearnDialog = ({ set, onStartLearning }: LearnDialogProps) => {
  const [rounds, setRounds] = useState(set.cards.length);
  const [questionType, setQuestionType] = useState("written");

  const handleStartClick = () => {
    onStartLearning(rounds, questionType);
  };
  return (
    <Dialog open>
      <DialogContent className="gap-4">
        <DialogTitle className="text-2xl">Learn</DialogTitle>
        <div className="flex w-full justify-between items-center">
          <Label className="w-full">Length of Rounds</Label>
          <Input
            type="number"
            defaultValue={set.cards.length}
            onChange={(e) => setRounds(Number(e.target.value))}
            max={set.cards.length}
            min={5}
            className="w-10 p-0 text-center"
          />
        </div>
        <Separator className="" />
        <h4 className="font-medium">Question Type</h4>
        <RadioGroup
          value={questionType}
          onValueChange={setQuestionType}
          className="w-full"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="written" id="written" />
            <Label htmlFor="written">Written</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multiple choice" id="multiple choice" />
            <Label htmlFor="multiple choice">Multiple Choice</Label>
          </div>
        </RadioGroup>
        <DialogClose asChild>
          <div className="flex justify-end gap-2">
            <Button variant={"soft_outline"}>Cancel</Button>
            <Button onClick={handleStartClick}>Start</Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default LearnDialog;
