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

interface SynopsisChartProps {
  person: string;
  number: string;
  lemma: string;
  mood: keyof typeof synopsis.charts;
}

// TODO: make this a form for submission

const SynopsisChart = ({ person, number, lemma, mood }: SynopsisChartProps) => {
  const chart = synopsis.charts[mood];

  return (
    <div>
      <form>
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
              {chart.rows.map((tense) => (
                <TableRow className="w-full" key={tense}>
                  <TableCell className="">{tense}</TableCell>
                  <ChartCell
                    lemma={lemma}
                    requested_form={{
                      pos: "verb",
                      person,
                      number,
                      tense: tense.toLowerCase(),
                      mood: mood.toLowerCase(),
                      voice: "active",
                    }}
                  />
                  <ChartCell
                    lemma={lemma}
                    requested_form={{
                      pos: "verb",
                      person,
                      number,
                      tense: tense.toLowerCase(),
                      mood: mood.toLowerCase(),
                      voice: "passive",
                    }}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </form>
    </div>
  );
};

export default SynopsisChart;
