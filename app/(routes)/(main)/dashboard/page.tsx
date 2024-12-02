import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const elements = [
  { element: "1st Person", singular: "amō", plural: "amāmus" },
  { element: "2nd Person", singular: "amās", plural: "amātis" },
  { element: "3rd Person", singular: "amat", plural: "amant" },
];

// TODO: add dashboard functionality; flashcard sets, previous sessions, etc.

const DashboardPage = () => { // just testing 
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex w-[500px] overflow-visible">
        <Table className="border border-slate-900">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Number</TableHead>
              <TableHead>Singular</TableHead>
              <TableHead>Plural</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elements.map((element) => (
              <TableRow key={element.element}>
                <TableCell>{element.element}</TableCell>
                <TableCell>{element.singular}</TableCell>
                <TableCell>{element.plural}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;
