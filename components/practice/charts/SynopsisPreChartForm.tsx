"use client";

import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SynopsisPreChartFormSchema } from "@/schemas";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Form schema

type SynopsisPreChartFormValues = z.infer<typeof SynopsisPreChartFormSchema>;

interface SynopsisPreChartFormProps {
  onSubmit: (params: SynopsisPreChartFormValues) => void;
  setMood: (mood: string) => void;
  methods: any;
}

const SynopsisPreChartForm = ({
  onSubmit,
  setMood,
}: SynopsisPreChartFormProps) => {
  const methods = useForm<SynopsisPreChartFormValues>({
    resolver: zodResolver(SynopsisPreChartFormSchema),
    defaultValues: {
      person: "first",
      number: "singular",
      lemma: "",
      mood: "indicative",
    },
  });

  const { handleSubmit, register, watch, control } = methods;

  const mood = watch("mood");

  useEffect(() => {
    setMood(mood);
  }, [mood, setMood]);

  return (
    <FormProvider {...methods}>
      <Card className="rounded-3xl w-80">
        <form
          onSubmit={handleSubmit((data: any) => {
            console.log("SynopsisPreChartForm Data:", data); // Debugging output
            onSubmit(data);
          })}
          className="flex flex-col w-full h-full gap-4 p-4"
        >
          <div className="flex flex-col gap-2">
            <label className="font-bold">Person</label>
            <Controller
              name={"person"}
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First</SelectItem>
                    <SelectItem value="second">Second</SelectItem>
                    <SelectItem value="third">Third</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Number</label>
            {/* <select {...register("number")} className="border p-2 rounded">
              <option value="singular">Singular</option>
              <option value="plural">Plural</option>
            </select> */}
            <Controller
              name={"number"}
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue defaultValue="singular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="singular">Singular</SelectItem>
                    <SelectItem value="plural">Plural</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Lemma</label>
            <Input
              type="text"
              {...register("lemma")}
              className="border p-2 rounded"
              placeholder="Enter lemma (e.g., fero)"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Mood</label>
            {/* <select {...register("mood")} className="border p-2 rounded">
              <option value="indicative">Indicative</option>
              <option value="subjunctive">Subjunctive</option>
              <option value="imperative">Imperative</option>
            </select> */}
            <Controller
              name={"mood"}
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue defaultValue="indicative" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indicative">Indicative</SelectItem>
                    <SelectItem value="subjunctive">Subjunctive</SelectItem>
                    <SelectItem value="participle">Participles</SelectItem>
                    <SelectItem value="infinitive">Infinitives</SelectItem>
                    <SelectItem value="imperative">Imperatives</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Button type="submit">Generate Chart</Button>
        </form>
      </Card>
    </FormProvider>
  );
};

export default SynopsisPreChartForm;
