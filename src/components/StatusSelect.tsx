import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Status } from '../data/types/books';
import { defaultStatus } from '../data/constants';
import { StatusSelectProps } from '../data/types/components';

export const StatusSelect = ({
  isHome,
  className,
  value,
  onValueChange,
}: StatusSelectProps) => {
  const categories = isHome
    ? [{ value: 'all', label: 'Todos' }, ...defaultStatus]
    : defaultStatus;

  return (
    <Select value={value} onValueChange={(val) => onValueChange(val as Status)}>
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
