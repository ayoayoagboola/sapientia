"use client";

import { LoaderCircle, SquareCheck, TriangleAlert } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "bg-slate-50 text-sm group toast relative fixed bottom-4 right-4 z-50 flex w-full items-center justify-start gap-3 overflow-hidden rounded-lg border border-slate-900 py-3 px-4 transition-all",
          description: "group-[.toast]:text-slate-500",
          actionButton:
            "group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50",
          cancelButton:
            "group-[.toast]:bg-slate-50 group-[.toast]:text-slate-900",
        },
      }}
      icons={{
        success: <SquareCheck color="#27283e" size={18} />,
        error: <TriangleAlert color="#27283e" size={18} />,
        loading: (
          <LoaderCircle color="#27283e" size={18} className="animate-spin" />
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
