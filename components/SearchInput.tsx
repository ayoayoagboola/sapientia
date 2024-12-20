"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "./ui/input";
import { trpc } from "@/app/_trpc/client";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/debounce";
import { LoaderCircle } from "lucide-react";

// TODO: improve reusability 

interface SearchInputProps {
  queryKey: string;
  pos: string
  onSelect: (item: string) => void;
  placeholder?: string;
}

type SearchResult = string;

const SearchInput = ({ placeholder, pos }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { register, setValue } = useFormContext();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: searchResults,
    isLoading,
    isError,
  } = trpc.words.searchWords.useQuery({ term: debouncedSearchTerm, pos: pos}, {
    enabled: debouncedSearchTerm.length > 0, // Trigger query only when searchTerm is not empty
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchResult = (word: SearchResult) => {
    setSearchTerm(word);
    setValue("lemma", word);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Input
        {...register("lemma")}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="border p-2 w-full"
      />

      {isLoading && <div className="flex items-center justify-center text-gray-500"><LoaderCircle className="animate-spin"/></div>}

      {isError && (
        <div className="text-center text-red-500">Error fetching results</div>
      )}

      <div className="flex w-full">
        {searchTerm && searchResults && searchResults.length > 0 && (
          <div className="flex flex-col w-full gap-1">
            {searchResults.map((result, index) => (
              <Button
                type="button"
                variant={"ghost"}
                className="justify-start w-full pl-2 bg-slate-100 hover:bg-slate-200"
                onClick={() => handleSearchResult(result)}
                key={index}
              >
                {result}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
