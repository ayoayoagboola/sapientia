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

// Form schema

type DeclinationPreChartFormValues = z.infer<
  typeof DeclinationPreChartFormSchema
>;

interface DeclinationPreChartFormProps {
  onSubmit: (params: DeclinationPreChartFormValues) => void;
  methods: any;
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

  const { handleSubmit, register } = methods;
  console.log(methods.getValues());

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
            <Input
              type="text"
              {...register("lemma")}
              className="border p-2 rounded"
              placeholder="Enter lemma (e.g., fero)"
            />
          </div>
          <Button type="submit">Generate Chart</Button>
        </form>
      </Card>
    </FormProvider>
  );
};

export default DeclinationPreChartForm;
