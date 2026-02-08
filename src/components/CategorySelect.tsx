import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Status } from "../data/types";

const defaultCategories = [
  { value: "read", label: "Lido" },
  { value: "reading", label: "Lendo" },
  { value: "abandoned", label: "Abandonado" },
  { value: "toRead", label: "Para ler" },
];

type CategorySelectProps = {
  isHome?: boolean;
  className?: string;
  value: Status | "";
  onValueChange: Dispatch<SetStateAction<Status>>;
};

export const CategorySelect = ({
  isHome,
  className,
  value,
  onValueChange,
}: CategorySelectProps) => {
  const categories = isHome
    ? [{ value: "all", label: "Todos" }, ...defaultCategories]
    : defaultCategories;

  return (
    <Select
      value={value}
      onValueChange={(value) => onValueChange(value as Status)}
    >
      <SelectTrigger className={`w-fit min-w-30 ml-auto ${className}`}>
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
