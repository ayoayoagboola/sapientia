"use client";

import { trpc } from "@/app/_trpc/client";
import CreateFlashCardSet from "@/components/practice/flashcards/CreateFlashCardSet";
import { Button } from "@/components/ui/button";
import { CreateFlashCardSetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type CreateFlashCardSetValues = z.infer<typeof CreateFlashCardSetSchema>;

const CreateFlashCardsPage = () => {
  const mutation = trpc.flashcards.createFlashCardSet.useMutation();

  const methods = useForm<CreateFlashCardSetValues>({
    resolver: zodResolver(CreateFlashCardSetSchema),
    defaultValues: {
      title: "",
      description: "",
      cards: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateFlashCardSetSchema>) => {
    const newData = {
      ...data,
      cards: data.cards.map((card) => ({
        ...card,
      })),
    };
    const id = await mutation.mutateAsync({ set: newData });
    toast.success("asdfjadsfadfsdf");
    console.log("results: ", newData);
    redirect(`/practice/flashcards/${id}`);
    
  };

  console.log(methods.getValues());

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col w-full h-full items-center justify-center bg-slate-50 p-12 gap-5">
        <div className="flex w-[750px] justify-between">
          <div className="flex justify-start items-center">
            <h3 className="font-semibold">Create a new flashcard set</h3>
          </div>
          <Button
            disabled={mutation.isPending}
            type="submit"
            onClick={methods.handleSubmit(onSubmit)}
          >
            <Plus />
            Create
          </Button>
        </div>
        <CreateFlashCardSet />
      </div>
    </FormProvider>
  );
};

export default CreateFlashCardsPage;
