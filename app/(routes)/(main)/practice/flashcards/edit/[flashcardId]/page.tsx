"use client";

import { trpc } from "@/app/_trpc/client";
import CreateFlashCardSet from "@/components/practice/flashcards/CreateFlashCardSet";
import { Button } from "@/components/ui/button";
import { EditFlashCardSetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { use } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO: fix adding new terms to set

interface EditFlashCardsPageProps {
  params: Promise<{ flashcardId: string }>;
}

type EditFlashCardSetValues = z.infer<typeof EditFlashCardSetSchema>;

const EditFlashCardsPage = ({ params }: EditFlashCardsPageProps) => {
  const { flashcardId: setId } = use(params);
  const router = useRouter();
  const {
    data: set,
    isLoading,
    error,
  } = trpc.flashcards.getFlashCardSet.useQuery({
    id: setId,
  });

  const mutation = trpc.flashcards.editFlashCardSet.useMutation({
    onSuccess: () => {
      // Refetch the flashcard set after editing is successful
      toast.success("Flashcard set updated successfully!");
      router.push(`/practice/flashcards/${setId}`);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to save changes.");
    },
  });

  const methods = useForm<EditFlashCardSetValues>({
    resolver: zodResolver(EditFlashCardSetSchema),
    defaultValues:
      set && !("error" in set)
        ? { ...set, description: set.description || undefined }
        : {
            id: "",
            dateAdded: "",
            userId: "",
            title: "",
            description: null,
            cards: [],
          },
  });

  const onSubmit = async (data: z.infer<typeof EditFlashCardSetSchema>) => {
    console.log(data);
    const newData = {
      ...data,
      cards: data.cards.map((card) => ({
        ...card,
      })),
    };
    console.log("new data: ", newData);
    await mutation.mutateAsync({ set: newData });
    console.log("results: ", newData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(methods.getValues());
  console.log(methods.formState.errors); // Debug any validation errors.

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col w-full h-full items-center justify-center bg-slate-50 p-12 gap-5">
        <div className="flex w-[750px] justify-between">
          <div className="flex justify-start items-center">
            <h3 className="font-semibold">Edit flashcard set</h3>
          </div>
          <Button
            disabled={mutation.isPending}
            type="submit"
            onClick={methods.handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
        <CreateFlashCardSet />
      </div>
    </FormProvider>
  );
};

export default EditFlashCardsPage;
