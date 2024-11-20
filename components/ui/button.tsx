import * as React from "react";
import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-semibold text-sm px-3.5 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 gap-2",
  {
    variants: {
      variant: {
        default: "bg-slate-900 hover:bg-slate-700 text-slate-50",
        solid: "bg-accent-400 hover:bg-[var(--accent-2)] text-slate-50",
        outline: "bg-transparent border border-slate-400 hover:bg-slate-400",
        light: "bg-transparent border border-bg-3 hover:bg-bg-3",
        sidebar:
          "bg-transparent hover:bg-bg-3 font-medium px-2 py-1.5 rounded-[5px]",
        toolbar: "bg-transition hover:bg-bg-3 p-[5px] rounded-[5px]",
      },
      // size: {},
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
