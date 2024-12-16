import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const PracticePage = () => {
  // will be adding more charts and stuff soon
  return (
    <div className="flex flex-col w-full h-full items-center justify-start bg-slate-50">
      <div className="flex flex-col w-full items-center justify-center gap-2 px-8 py-4">
        <h3 className="font-semibold">Practice</h3>
        <p className="text-slate-600">
          Interactive practice tools to help you master Latin&apos;s grammatical
          structures!
        </p>
      </div>
      <div className="flex flex-col w-full items-center justify-center gap-2 px-8 py-4">
        <h3 id="charts">Charts</h3>
        <div className="grid grid-flow-col gap-8 ">
          {["Synopsis", "Conjugation", "Declination"].map((chart) => (
            <Card key={chart} className="flex w-64 h-36 items-center justify-center font-medium rounded-[20px] hover:shadow-[8px_8px_0px_rgba(27,32,42,1)] hover:translate-x-[-8px] hover:translate-y-[-8px] transition-all">
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
