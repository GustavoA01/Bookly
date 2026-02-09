import { Button } from "@/src/components/ui/button";
import { DatePicker } from "@/src/components/ui/DatePicker";

type DatesFormProps = {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  dateErrorMessage: string | null;
  handleCleanDates: () => void;
};

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

    {dateErrorMessage && (
      <p className="sm:hidden text-sm text-red-600">{dateErrorMessage}</p>
    )}

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
