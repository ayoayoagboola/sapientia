"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ChartCell from "./ChartCell";
import { synopsis } from "@/data/practice/synopsis";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChartFormSchema } from "@/schemas";

interface SynopsisChartProps {
  person: string;
  number: string;
  lemma: string;
  mood: string;
  name: string;
  validated: {
    tense: string;
    active: boolean;
    passive: boolean;
  }[];
  showAnswer: boolean;
}

const SynopsisChart = ({
  person,
  number,
  lemma,
  mood,
  name,
  validated,
  showAnswer,
}: SynopsisChartProps) => {
  const chart = synopsis.charts[mood as keyof typeof synopsis.charts];
  const results = validated.map(({ tense, ...rest }) => rest);

  return (
    <div>
      <div className="flex w-[500px] overflow-visible">
        <Table className="border border-slate-900">
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="">Tense</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Passive</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chart.rows.map((tense, index) => (
              <TableRow className="w-full" key={index}>
                <TableCell className="">{tense}</TableCell>
                {["active", "passive"].map((voice) => (
                  <ChartCell
                    key={`${name}.${index}.${voice}`}
                    lemma={lemma}
                    requested_form={{
                      pos: "verb",
                      person,
                      number,
                      tense: tense.toLowerCase(),
                      mood: mood.toLowerCase(),
                      voice,
                    }}
                    name={`${name}.${index}.${voice}`}
                    validation={`${name}.${index}.correct.${voice}`}
                    isCorrect={
                      results[index]?.[voice as keyof (typeof results)[number]] ?? false
                    }
                    
                    showAnswer={showAnswer}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SynopsisChart;
