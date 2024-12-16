"use client";

import PreChartForm from "@/components/practice/charts/SynopsisPreChartForm";
import SynopsisChart from "@/components/practice/charts/SynopsisChart";
import { Button } from "@/components/ui/button";
import { synopsis } from "@/data/practice/synopsis";
import {
  ChartFormSchema,
  SynopsisPreChartFormSchema,
  SynopsisChartSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import SynopsisPreChartForm from "@/components/practice/charts/SynopsisPreChartForm";
import { toast } from "sonner";

// TODO: impelement dynamic sessions

type SynopsisChartFormValues = z.infer<typeof SynopsisChartSchema>;

const SynopsisPage = () => {
  const [mood, setMood] = useState<string>("");
  const [charts, setCharts] = useState<SynopsisChartFormValues["charts"]>([]);
  const [showAnswers, setShowAnswers] = useState<any>(false);
  const [results, setResults] = useState<
    Array<{ tense: string; active: boolean; passive: boolean }>
  >([]);

  const methods = useForm<SynopsisChartFormValues>({
    resolver: zodResolver(SynopsisChartSchema),
    defaultValues: {
      charts: [],
    },
  });

  const handleMoodChange = (mood: string) => {
    setMood(mood);
  };

  const handlePreChartSubmit = (
    newChart: Omit<SynopsisChartFormValues["charts"][0], "responses">
  ) => {
    const tenses = mood
      ? synopsis.charts[mood as keyof typeof synopsis.charts].rows
      : [];
    console.log("PreChart Data Received:", newChart);
    const updatedChart = {
      ...newChart,
      responses: tenses.map((tense) => ({
        tense: tense.toLowerCase(),
        active: "",
        passive: "",
        correct: {
          active: "",
          passive: "",
        },
      })),
    };

    setCharts((prev) => [...prev, updatedChart]);
    methods.setValue("charts", [...methods.getValues("charts"), updatedChart]);
  };

  const onSubmit = (data: z.infer<typeof SynopsisChartSchema>) => {
    toast.success("Chart submmitted!");
    console.log("Validated Data:", data);

    const results = data.charts.map((chart) => ({
      person: chart.person,
      number: chart.number,
      mood: chart.mood,
      validated: chart.responses.map((response, idx) => ({
        tense: `Tense ${idx + 1}`,
        active: response.active === response.correct?.active, // Replace with dynamic validation
        passive: response.passive === response.correct?.passive,
      })),
    }));

    console.log("Validation Results:", results);
    for (const result of results) {
      setResults(result.validated);
    }
    setShowAnswers(true);
  };

  const handleRestart = () => {
    setCharts([]);
    setResults([]);
    setShowAnswers(false);
    methods.reset(); // Reset the form state
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col w-full h-full items-center justify-center bg-slate-50">
        <div className="flex flex-col w-full items-center justify-center gap-2 px-8 py-4">
          {charts.length === 0 ? (
            <SynopsisPreChartForm
              onSubmit={handlePreChartSubmit}
              setMood={handleMoodChange}
              methods={methods}
            />
          ) : (
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-4">
                {charts.map((chart, index) => (
                  <SynopsisChart
                    key={index}
                    person={chart.person}
                    number={chart.number}
                    lemma={chart.lemma}
                    mood={chart.mood}
                    name={`charts.${index}.responses`}
                    validated={results}
                    showAnswer={showAnswers}
                  />
                ))}
              </div>

              <div className="flex w-full items-center justify-center gap-4">
                {showAnswers ? (
                  <Button>
                    <Link href="/practice">Finish</Link>
                  </Button>
                ) : (
                  <Button type="submit">Submit Charts</Button>
                )}
                <Button onClick={handleRestart}>Restart</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default SynopsisPage;
