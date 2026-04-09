import { isAfter } from 'date-fns';
import { useState } from 'react';

export const useBookDates = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const getErrorMessages = () => {
    if (startDate && endDate && isAfter(startDate, endDate))
      return 'A data de término não pode ser anterior à data de início.';
    if (!startDate && endDate) return 'A data de início é obrigatória para definir a data de término.';
    return '';
  };

  const handleCleanDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleCleanDates,
    dateErrorMessage: getErrorMessages(),
  };
};
