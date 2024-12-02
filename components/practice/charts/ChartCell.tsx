import { trpc } from "@/app/_trpc/client";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";

interface ChartCellProps {
  lemma: string;
  requested_form: WordForm;
}

// TODO: figure out how to verify answers

const ChartCell = ({ lemma, requested_form }: ChartCellProps) => {
  const word = trpc.words.getWordForm.useQuery({
    lemma: lemma,
    form: requested_form,
  });

  return (
    <TableCell className="p-0">
      <Input
        className="w-full h-full border-0 rounded-none bg-transparent focus-visible:outline-none"
        placeholder={word.data?.form || "none"}
        type="text"
      />
    </TableCell>
  );
};

export default ChartCell;
