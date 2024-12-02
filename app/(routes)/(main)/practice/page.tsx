import { Card } from "@/components/ui/card";
import React from "react";

const PracticePage = () => { // will be adding more charts and stuff soon
  return (
    <div className="flex flex-col w-full h-full items-center justify-start bg-slate-50">
      <div className="flex flex-col w-full items-center justify-center gap-2 px-8 py-4">
        <h2 className="font-bold">Practice</h2>
        <p className="font-medium text-slate-600">
          Interactive practice tools to help you master Latin`&apos;`s
          grammatical structures!
        </p>
      </div>
      <div className="flex flex-col w-full items-center justify-center gap-2 px-8 py-4">
        <h3>Charts</h3>
        <div className="grid grid-flow-col gap-8 ">
          <Card>Verb Synopsis</Card>
          <Card>Conjugation</Card>
          <Card>Declination</Card>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
