import { FormErrorMessage } from '@/src/components/FormErrorMessage';
import { Button } from '@/src/components/ui/button';
import { DatePicker } from '@/src/components/ui/DatePicker';
import { DatesFormProps } from '../types';

export const DatesForm = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  dateErrorMessage,
  handleCleanDates,
}: DatesFormProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:space-x-2">
    <div className="space-y-2 w-full">
      <DatePicker label="Início" date={startDate} setDate={setStartDate} />
    </div>

    <div className="space-y-2 w-full">
      <DatePicker label="Término" date={endDate} setDate={setEndDate} />
    </div>

    <FormErrorMessage
      showMessage={!!dateErrorMessage}
      message={dateErrorMessage}
      className="sm:hidden"
    />

    {(startDate || endDate) && (
      <Button
        variant="outline"
        onClick={handleCleanDates}
        className="w-full sm:w-auto mt-auto"
      >
        Limpar datas
      </Button>
    )}
  </div>
);
