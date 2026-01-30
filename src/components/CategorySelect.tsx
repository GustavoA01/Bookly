import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const categories = [
  { value: "read", label: "Lido" },
  { value: "reading", label: "Lendo" },
  { value: "abandoned", label: "Abandonado" },
  { value: "toRead", label: "Para ler" },
];

export const CategorySelect = ({ isHome }: { isHome?: boolean }) => {
  if (isHome) categories.push({ value: "all", label: "Todos" });

  return (
    <Select>
      <SelectTrigger className="w-fit min-w-30 ml-auto">
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
