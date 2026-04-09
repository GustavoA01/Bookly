import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { DialogClose, DialogFooter, DialogTitle } from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { usePasswordForm } from '../hooks/usePasswordForm';
import { FormErrorMessage } from '@/src/components/FormErrorMessage';

export const PasswordForm = () => {
  const { handleChangePassword, handleSubmit, register, errorPassMessage, errorPreviousPassMessage, isChanging } =
    usePasswordForm();

  return (
    <>
      <DialogTitle>Alterar senha</DialogTitle>
      <form id="password-form" onSubmit={handleSubmit(handleChangePassword)} className="flex flex-col gap-4">
        <Label>Escreva sua senha atual</Label>
        <Input placeholder="Ex: ahneS321$#" {...register('previousPassword')} />
        <FormErrorMessage showMessage={!!errorPreviousPassMessage} message={errorPreviousPassMessage} />

        <Label>Escreva sua nova senha</Label>
        <Input placeholder="Ex: ahneS321$#" {...register('password')} />
        <FormErrorMessage showMessage={!!errorPassMessage} message={errorPassMessage} />
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={isChanging}>
            Cancelar
          </Button>
        </DialogClose>
        <Button form="password-form" type="submit" disabled={isChanging}>
          {isChanging ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogFooter>
    </>
  );
};
