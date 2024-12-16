import { trpc } from "@/app/_trpc/client";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { Controller, useFormContext } from "react-hook-form";

// TODO: figure out autocomplete bg

interface ChartCellProps {
  lemma: string;
  requested_form: WordForm;
  name: string;
  validation: string;
  isCorrect: boolean;
  showAnswer: boolean;
}

const ChartCell = ({
  lemma,
  requested_form,
  name,
  validation,
  isCorrect,
  showAnswer,
}: ChartCellProps) => {
  const word = trpc.words.getWordForm.useQuery({
    lemma: lemma,
    form: requested_form,
  });

  const { control, setValue } = useFormContext();

  const correctAnswer = word.data?.form || "none";

  if (correctAnswer) {
    setValue(validation, correctAnswer, { shouldValidate: false });
  }
  // Store the correct answer in the parent form using a parallel structure

  return (
    <TableCell
      className={`p-0 ${
        showAnswer
          ? isCorrect
            ? "bg-green-50 hover:bg-green-100 border-green-300" // Correct answer background
            : "bg-red-50 hover:bg-red-100 border-red-300" // Incorrect answer background
          : ""
      }`}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            className="w-full h-full border-0 rounded-none bg-transparent autofill:bg-transparent focus-visible:outline-none"
            placeholder={showAnswer ? correctAnswer : "Enter form"}
            type="text"
            value={showAnswer ? correctAnswer : field.value || ""}
            readOnly={showAnswer}
          />
        )}
      />
    </TableCell>
  );
};

export default ChartCell;
