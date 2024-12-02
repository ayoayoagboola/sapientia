import * as React from "react";
import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const cardVariants = cva(
  "flex items-center justify-center border-black border rounded-lg bg-slate-50 gap-3",
  {
    variants: {
      variant: {
        default: "p-1.5",
        no_padding: "p-0", 
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };
