import { ListFormType } from '@/src/data/schemas';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

export type ListCardProps = {
  id: string;
  name: string;
  itemCount: number;
};

export type DialogListTriggerProps = { onClick: () => void };

export type ImageFormProps = {
  register: UseFormRegister<ListFormType>;
  setValue: UseFormSetValue<ListFormType>;
  choosedFile: string | undefined;
  setChoosedFile: (file: string | undefined) => void;
  showImage: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageError: () => void;
};

export type DescriptionFormProps = {
  register: UseFormRegister<ListFormType>;
};
