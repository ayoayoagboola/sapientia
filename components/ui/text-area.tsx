"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    // Reset the height to 'auto' so it can shrink if necessary
    textarea.style.height = "auto";
    // Set the height to the scrollHeight (content height) to make it grow
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      className={cn(
        "flex w-full rounded-md border border-slate-900 bg-slate-50 px-3 py-2 text-slate-900 ring-offset-slate-50 placeholder:text-slate-400 focus:border-0 focus:outline-1 focus:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-50 text-sm",
        className
      )}
      ref={ref}
      onInput={(e) => adjustHeight(e.target as HTMLTextAreaElement)} // Ensure resizing on input
      style={{ resize: "none" }} // Disable the default resize handle
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
