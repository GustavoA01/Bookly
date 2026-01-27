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
  { value: "all", label: "Todos" },
];

export const CategorySelect = () => {
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
