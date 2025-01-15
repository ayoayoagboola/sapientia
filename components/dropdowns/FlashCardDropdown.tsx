"use client";

import { trpc } from "@/app/_trpc/client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ALargeSmall,
  EllipsisVertical,
  ExternalLink,
  Pen,
  Link as LinkIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import copy from "copy-to-clipboard";

// TODO: implement actions (renaming)

interface FlashCardDropdownProps {
  id: string;
}

const FlashCardDropdown = ({ id }: FlashCardDropdownProps) => {
  const deleteSet = trpc.flashcards.deleteFlashCardSet.useMutation({
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
      <DropdownMenuContent className="rounded-xl">
        <DropdownMenuItem asChild>
          <Link href={`/practice/flashcards/edit/${id}`}>
            <Pen /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ALargeSmall />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/practice/flashcards/${id}`} target="_blank">
            <ExternalLink />
            Open in new tab
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            copy(`http://localhost:3000/practice/flashcards/${id}`),
              toast.success("Copied to clipboard!");
          }}
        >
          <LinkIcon />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteSet.mutate({ id: id })}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FlashCardDropdown;
