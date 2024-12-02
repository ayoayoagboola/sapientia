import SynopsisChart from "@/components/practice/charts/SynopsisChart";
import React from "react";

// TODO: impelement dynamic sessions + choosing which charts to fill out

const SynopsisPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center bg-slate-50">
      <div className="flex flex-col w-full items-center justify-center gap-2 px-8 py-4">
        <SynopsisChart
          person={"second"}
          number={"singular"}
          lemma={"fero"}
          mood={"indicative"}
        />
      </div>
    </div>
  );
};

export default SynopsisPage;
