import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { filterOptions } from '@/src/data/constants';
import { FilterOptionsType } from '@/src/data/types/books';
import { FilterSelectProps } from '../types';

export const FilterSelect = ({ value, onSelect }: FilterSelectProps) => (
  <Select
    value={value}
    onValueChange={(val) => onSelect(val as FilterOptionsType)}
  >
    <SelectTrigger>
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
