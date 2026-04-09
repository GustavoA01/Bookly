import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { BookFormType } from '@/src/data/schemas';
import { UseFormRegister } from 'react-hook-form';

type AuthorFormProps = {
  register: UseFormRegister<BookFormType>;
};

export const AuthorForm = ({ register }: AuthorFormProps) => (
  <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:space-x-2">
    <div className="space-y-2 cols-span-1">
      <Label>Autor</Label>
      <Input {...register('author')} placeholder="Ex: J.R.R. Tolkien" />
    </div>

    <div className="space-y-2 cols-span-1">
      <Label>Gênero</Label>
      <Input {...register('genre')} placeholder="Ex: Fantasia" />
    </div>
  </div>
);
