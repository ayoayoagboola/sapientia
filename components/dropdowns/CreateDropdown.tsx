import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, GalleryVerticalEnd, Plus } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// TODO: add more create options (idek what lol)

const CreateDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
      className={cn(buttonVariants({ variant: "soft_outline" }), "px-3 gap-1 h-8 border-slate-300")}
      >
        <Plus />
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link className="flex gap-2" href={"/practice/flashcards/create"}>
            <GalleryVerticalEnd />
            New flashcard set
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateDropdown;
