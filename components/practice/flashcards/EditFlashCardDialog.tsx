import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EditFlashCardDialogSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// fix styling + functionality 

interface EditFlashCardDialogProps {
  id: string;
  term: string;
  definitions: string;
  children: React.ReactNode;
}

type EditFlashCardValues = z.infer<typeof EditFlashCardDialogSchema>;

const EditFlashCardDialog = ({
  id,
  term,
  definitions,
  children,
}: EditFlashCardDialogProps) => {
  const methods = useForm<EditFlashCardValues>({
    resolver: zodResolver(EditFlashCardDialogSchema),
    defaultValues: {
      id,
      term,
      definitions,
    },
  });

  const { register, getValues, setValue } = methods;

  const editCard = trpc.flashcards.editFlashCard.useMutation({
    onSuccess: () => {
      toast.success("Flashcard successfully edited.");
    },
    onError: () => {
      toast.error("Flashcard edit unsuccesful.");
    },
  });

  const handleCharacterClick = (char: string) => {
    // Get current value of the field and append the character
    const currentValue = (getValues("term") || "") as string;
    setValue("term", currentValue + char);
  };

  return (
    <form>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="flex flex-col w-[750px] gap-0 justify-start border-slate-900 rounded-[20px]">
          <div className="flex flex-col w-full">
            <div className="flex w-full px-4 py-2 border-b border-b-slate-900 justify-between items-center" />
            <div className="flex w-full items-center justify-between px-8 pt-8 gap-8">
              <Input
                placeholder="Enter Latin"
                className="!w-full !p-0 !border-0 !border-b !border-b-slate-900 !font-normal !text-base focus:outline-0 !rounded-none"
                {...register(`term`)}
              />
              <Input
                placeholder="Enter English"
                className="!w-full !p-0 !border-0 !border-b !border-b-slate-900 !font-normal !text-base focus:outline-0 !rounded-none"
                {...register(`definitions`)}
              />
            </div>
            <div className="flex w-full h-14 gap-2 pl-28 items-center">
              {["ā", "ē", "ī", "ō", "ū"].map((char) => (
                <Button
                  key={char}
                  className="p-0 w-8 h-8 text-sm"
                  variant="ghost"
                  onClick={() => handleCharacterClick(char)} // For appending to the term
                >
                  {char}
                </Button>
              ))}
            </div>
            <div>
              <Button className="w-full">Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default EditFlashCardDialog;
