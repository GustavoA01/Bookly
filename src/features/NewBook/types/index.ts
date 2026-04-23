import { BookFormType } from '@/src/data/schemas';
import { FormSearchParamsType } from '@/src/data/types/api';
import { Status } from '@/src/data/types/books';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister, UseFormReset } from 'react-hook-form';

export type UseFetchBookFormType = {
  params: FormSearchParamsType;
  reset: UseFormReset<BookFormType>;
  setChoosedFile: (url: string | undefined) => void;
  setStatus: (status: Status) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
};

export type AuthorFormProps = {
  register: UseFormRegister<BookFormType>;
};

export type DatesFormProps = {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  dateErrorMessage: string | null;
  handleCleanDates: () => void;
};

export type ImageDialogProps = {
  choosedFile: string | undefined;
  setChoosedFile: (file: string | undefined) => void;
  showImage: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  chooseImageError: string | undefined | null;
};

export type ImageFormProps = {
  register: UseFormRegister<BookFormType>;
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  choosedFile: string | undefined;
  setChoosedFile: (file: string | undefined) => void;
  showImage: boolean;
  chooseImageError?: string | null;
  handleImageError: () => void;
  cleanCurrentImage: () => void;
};

export type PagesFormProps = {
  register: UseFormRegister<BookFormType>;
};
