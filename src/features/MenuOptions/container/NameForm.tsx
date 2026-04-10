import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  DialogClose,
  DialogFooter,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { useNameForm } from '../hooks/useNameForm';

export const NameForm = () => {
  const { handleChangeName, handleSubmit, register } = useNameForm();

  return (
    <>
      <DialogTitle>Alterar nome de usuário</DialogTitle>
      <form
        id="name-form"
        onSubmit={handleSubmit(handleChangeName)}
        className="flex flex-col gap-4"
      >
        <Label>Escreva seu novo nome</Label>
        <Input placeholder="Ex: Jão Silva" {...register('name')} />
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button form="name-form" type="submit">
            Salvar
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
