"use client";

import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Search } from "lucide-react";

// TODO: add actual stuff lol

const Searchbar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center justify-start gap-2 h-8 w-56 rounded-md border text-sm border-slate-300 bg-slate-50 px-3 py-2 text-slate-500 hover:bg-slate-100"
      >
        <Search className="stroke-slate-400 w-4 h-4"/>
        Search...
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Searchbar;
