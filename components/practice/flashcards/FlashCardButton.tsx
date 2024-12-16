"use client";

import { trpc } from "@/app/_trpc/client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { EllipsisVertical, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// TODO: add more actions 

interface FlashCardButtonProps {
  id: string;
}

const FlashCardButton = ({ id }: FlashCardButtonProps) => {
  const deleteFlashCardSetMutation =
    trpc.flashcards.deleteFlashCardSet.useMutation({
      onSuccess: () => {
        toast.success("Deleted set!");
      },
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("p-0 w-6 h-5", buttonVariants({ variant: "ghost" }))}
      >
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={`/practice/flashcards/edit/${id}`}>
            <Pen /> Edit flashcards
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => deleteFlashCardSetMutation.mutate({ id: id })}
        >
          <Trash2 />
          Delete set
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FlashCardButton;
