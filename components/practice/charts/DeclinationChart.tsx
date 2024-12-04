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
import { declination } from "@/data/practice/declination";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChartFormSchema } from "@/schemas";

interface DeclinationChartProps {
  lemma: string;
  name: string;
  validated: {
    form: string;
    singular: boolean;
    plural: boolean;
  }[];
  showAnswer: boolean;
}

const DeclinationChart = ({
  lemma,

  name,
  validated,
  showAnswer,
}: DeclinationChartProps) => {
  const chart = declination.chart;
  const results = validated.map(({ form, ...rest }) => rest);

  return (
    <div>
      <div className="flex w-[500px] overflow-visible">
        <Table className="border border-slate-900">
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="">Case</TableHead>
              <TableHead>Singular</TableHead>
              <TableHead>Plural</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chart.rows.map((form, index) => (
              <TableRow className="w-full" key={index}>
                <TableCell className="">{form}</TableCell>
                {["singular", "plural"].map((number) => (
                  <ChartCell
                    key={`${name}.${index}.${number}`}
                    lemma={lemma}
                    requested_form={{
                      pos: "noun",
                      case: form.toLowerCase(),
                      number,
                    }}
                    name={`${name}.${index}.${number}`}
                    validation={`${name}.${index}.correct.${number}`}
                    isCorrect={
                      results[index]?.[
                        number as keyof (typeof results)[number]
                      ] ?? false
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

export default DeclinationChart;
