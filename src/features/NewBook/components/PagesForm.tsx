import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { PagesFormProps } from '../types';

export const PagesForm = ({ register }: PagesFormProps) => (
  <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:space-x-2">
    <div className="space-y-2 cols-span-1">
      <Label>Número de páginas</Label>
      <Input
        type="number"
        {...register('numberOfPages', {
          setValueAs(value) {
            return value === '' ? undefined : Number(value);
          },
        })}
        placeholder="Ex: 300"
      />
    </div>

    <div className="space-y-2 cols-span-1">
      <Label>Página atual</Label>
      <Input
        type="number"
        {...register('currentPage', {
          setValueAs(value) {
            return value === '' ? undefined : Number(value);
          },
        })}
        placeholder="Ex: 150"
      />
    </div>
  </div>
);
