"use client"

import { LoaderCircle, SquareCheck, TriangleAlert } from "lucide-react";
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="bg-slate-50 text-sm group toast relative flex w-full items-center justify-start space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-slate-50 group-[.toaster]:text-slate-900 group-[.toaster]:border-slate-900",
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
  )
}

export { Toaster }
