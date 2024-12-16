"use client";

import { trpc } from "@/app/_trpc/client";
import Link from "next/link";

const TextPage = () => {
  const sections = trpc.texts.getTextForms.useQuery({
    bucket: "classical_texts",
    prefix: "quinct-section",
  });

  if (!sections.data) return "oops";

  return (
    <div className="flex-col">
      {/* Table of Contents */}
      {/* <nav className="toc my-4">
        <h2>Table of Contents</h2>
        <ul>
          {sections?.data?.map((_, index) => (
            <li key={index}>
              <a href={`#section-${index + 1}`}>Section {index + 1}</a>
            </li>
          ))}
        </ul>
      </nav> */}
      <div className="flex w-full h-full p-8 items-center justify-center">
        <h3 className="font-semibold">
          M. TVLLI CICERONIS PRO P. QVINCTIO ORATIO
        </h3>
      </div>

      {/* Render Text Sections */}
      <div className="flex flex-col items-start justify-center px-24 pb-16">
        {sections?.data?.map((section, index) => (
          <div key={index} id={`section-${index + 1}`} className="section my-6">
            <h3>Section {index + 1}</h3>
            <p>{section}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextPage;
