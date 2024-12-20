import { Card } from "@/components/ui/card";
import { TableProperties } from "lucide-react";
import Link from "next/link";
import React from "react";

// TODO: add pre-made flashcard sets

const PracticePage = () => {
  // will be adding more charts and stuff soon
  return (
    <div className="flex flex-col w-full h-full items-center justify-start p-8 gap-6">
      <div className="flex flex-col w-full items-start justify-start">
        <h2 className="font-semibold">Practice</h2>
        <p className="text-slate-500 text-sm">
          Interactive practice tools to help you master Latin&apos;s grammatical
          structures!
        </p>
      </div>
      <div className="flex flex-col w-full gap-4 p-6 border border-slate-200 rounded-[20px]">
        <div className="flex w-full h-full items-center justify-start gap-2">
          <TableProperties className="size-5 stroke-slate-600 rotate-180" />
          <h3 id="charts" className="font-medium">
            Charts
          </h3>
        </div>
        <div className="flex w-full h-full gap-4 items-center justify-center">
          {["Synopsis", "Conjugation", "Declination"].map((chart) => (
            <Card
              key={chart}
              className="flex w-64 h-36 items-center justify-center font-medium rounded-[20px] hover:shadow-[8px_8px_0px_rgba(27,32,42,1)] hover:translate-x-[-8px] hover:translate-y-[-8px] transition-all"
            >
              <Link
                className="flex w-full h-full items-center justify-center"
                href={`/practice/${chart.toLowerCase()}`}
              >
                {chart}
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <h3 id="flashcards">Flashcards</h3>
    </div>
  );
};

export default PracticePage;
