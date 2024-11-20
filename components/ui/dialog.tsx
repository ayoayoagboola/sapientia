"use client";

import React from "react";
import * as DialogRadix from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Dialog = DialogRadix.Root;

const DialogTrigger = DialogRadix.Trigger;

const DialogPortal = DialogRadix.Portal;

const DialogClose = DialogRadix.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogRadix.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogRadix.Overlay>
>(({ className, ...props }, ref) => (
  <DialogRadix.Overlay
    ref={ref}
    className={cn(
      "fixed backdrop-blur-[3px] inset-0 z-50 bg-black/50 data-[state=open]:animate-overlayShow data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogRadix.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogRadix.Content>,
  React.ComponentPropsWithoutRef<typeof DialogRadix.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogRadix.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 rounded-xl grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-900 bg-bg-1 p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
      <DialogRadix.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg-1 data-[state=open]:text-muted-foreground">
        <span className="sr-only">Close</span>
      </DialogRadix.Close>
    </DialogRadix.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogRadix.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogRadix.Title>,
  React.ComponentPropsWithoutRef<typeof DialogRadix.Title>
>(({ className, ...props }, ref) => (
  <DialogRadix.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogRadix.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogRadix.Description>,
  React.ComponentPropsWithoutRef<typeof DialogRadix.Description>
>(({ className, ...props }, ref) => (
  <DialogRadix.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogRadix.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
