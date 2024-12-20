"use client";

import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DeclinationPreChartFormSchema } from "@/schemas";
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
import SearchInput from "@/components/SearchInput";

// Form schema

// TODO: should adjectives, pronouns, and nouns be here? 

type DeclinationPreChartFormValues = z.infer<
  typeof DeclinationPreChartFormSchema
>;

interface DeclinationPreChartFormProps {
  onSubmit: (params: DeclinationPreChartFormValues) => void;
}

const DeclinationPreChartForm = ({
  onSubmit,
}: DeclinationPreChartFormProps) => {
  const methods = useForm<DeclinationPreChartFormValues>({
    resolver: zodResolver(DeclinationPreChartFormSchema),
    defaultValues: {
      lemma: "",
    },
  });

  const { handleSubmit, control } = methods;

  return (
    <FormProvider {...methods}>
      <Card className="rounded-3xl w-80">
        <form
          onSubmit={handleSubmit((data: any) => {
            console.log("DeclinationPreChartForm Data:", data); // Debugging output
            onSubmit(data);
          })}
          className="flex flex-col w-full h-full gap-4 p-4"
        >
          <div className="flex flex-col gap-2">
            <label className="font-bold">Lemma</label>
            <Controller
              name={"lemma"}
              control={control}
              render={({ field }) => (
                <SearchInput
                  queryKey="searchLemmas"
                  pos="noun"
                  onSelect={field.onChange}
                  placeholder="Search for lemmas"
                />
              )}
            />
          </div>
          <Button type="submit">Generate Chart</Button>
        </form>
      </Card>
    </FormProvider>
  );
};

export default DeclinationPreChartForm;
