import { Button } from './ui/button';
import { auth } from '../services/firebase/firebaseConfig';
import { useQueryClient } from '@tanstack/react-query';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from './ui/dialog';
import { ConfirmLogoutProps } from '../data/types/components';

export const ConfirmLogout = ({ setCloseModal }: ConfirmLogoutProps) => {
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await auth.signOut();
    queryClient.clear();
    setCloseModal(false);
  };

  return (
    <DialogContent>
      <DialogTitle>Sair</DialogTitle>
      <DialogDescription>
        Tem certeza que deseja sair da conta?
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button variant="destructive" onClick={handleLogout}>
          <p>Sair</p>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
