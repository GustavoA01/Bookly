import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { filterOptions } from "../data/constants";
import { Dispatch, SetStateAction } from "react";
import { FilterOptionsType } from "../data/types/books";

type FilterSelectProps = {
  value: FilterOptionsType | "";
  onSelect: Dispatch<SetStateAction<FilterOptionsType>>;
};

export const FilterSelect = ({ value, onSelect }: FilterSelectProps) => (
  <Select
    value={value}
    onValueChange={(val) => onSelect(val as FilterOptionsType)}
  >
    <SelectTrigger>
      <SlidersHorizontal />
      <SelectValue placeholder="Filtrar" />
    </SelectTrigger>
    <SelectContent>
      {filterOptions.map((option) => (
        <SelectItem value={option.value} key={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
