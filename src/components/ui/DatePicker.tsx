import { format } from 'date-fns';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Field, FieldLabel } from './field';
import { Calendar } from './calendar';

type DatePickerProps = {
  label: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

export const DatePicker = ({ label, date, setDate }: DatePickerProps) => (
  <Field>
    <FieldLabel htmlFor="date-picker-simple">{label}</FieldLabel>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker-simple"
          className="justify-start font-normal"
        >
          {date ? format(date, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          required={false}
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  </Field>
);
