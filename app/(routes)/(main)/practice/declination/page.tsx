"use client";

import DeclinationChart from "@/components/practice/charts/DeclinationChart";
import { Button } from "@/components/ui/button";
import { declination } from "@/data/practice/declination";
import { DeclinationChartSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DeclinationPreChartForm from "@/components/practice/charts/DeclinationPreChartForm";

// TODO: impelement dynamic sessions 

type DeclinationChartFormValues = z.infer<typeof DeclinationChartSchema>;

const DeclinationPage = () => {
  const [mood, setMood] = useState<string>("");
  const [charts, setCharts] = useState<DeclinationChartFormValues["charts"]>(
    []
  );
  const [showAnswers, setShowAnswers] = useState<any>(false);
  const [results, setResults] = useState<
    Array<{ form: string; singular: boolean; plural: boolean }>
  >([]);

  const methods = useForm<DeclinationChartFormValues>({
    resolver: zodResolver(DeclinationChartSchema),
    defaultValues: {
      charts: [],
    },
  });

  const handlePreChartSubmit = (
    newChart: Omit<DeclinationChartFormValues["charts"][0], "responses">
  ) => {
    console.log("PreChart Data Received:", newChart);
    const updatedChart = {
      ...newChart,
      responses: declination.chart.rows.map((form) => ({
        form: form.toLowerCase(),
        singular: "",
        plural: "",
        correct: {
          singular: "",
          plural: "",
        },
      })),
    };

    setCharts((prev) => [...prev, updatedChart]);
    methods.setValue("charts", [...methods.getValues("charts"), updatedChart]);
  };

  const onSubmit = (data: z.infer<typeof DeclinationChartSchema>) => {
    console.log("Validated Data:", data);

    const results = data.charts.map((chart) => ({
      validated: chart.responses.map((response, idx) => ({
        form: `Form ${idx + 1}`,
        singular: response.singular === response.correct?.singular, // Replace with dynamic validation
        plural: response.plural === response.correct?.plural,
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

  console.log(charts);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col w-full h-full items-center justify-center bg-slate-50">
        <div className="flex flex-col w-full items-center justify-center gap-2 px-8 py-4">
          {charts.length === 0 ? (
            <DeclinationPreChartForm
              onSubmit={handlePreChartSubmit}
              methods={methods}
            />
          ) : (
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-4">
                {charts.map((chart, index) => (
                  <DeclinationChart
                    key={index}
                    lemma={chart.lemma}
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

export default DeclinationPage;
