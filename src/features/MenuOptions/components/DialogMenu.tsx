import { LogIn } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { User } from 'firebase/auth';
import { Options } from './Options';

type DialogMenuProps = {
  user: User | null;
  handleLogout: () => void;
  handleOpenUserDialog: () => void;
  handleOpenPasswordDialog: () => void;
};

export const DialogMenu = ({
  user,
  handleLogout,
  handleOpenPasswordDialog,
  handleOpenUserDialog,
}: DialogMenuProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{user?.displayName}</DialogTitle>
      <DialogDescription>{user?.email}</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-2 mt-4">
      <Options
        handleOpenUserDialog={handleOpenUserDialog}
        handleOpenPasswordDialog={handleOpenPasswordDialog}
      />
      <DialogClose asChild>
        <Button variant="destructive" onClick={handleLogout}>
          <LogIn />
          <p>Sair</p>
        </Button>
      </DialogClose>
    </div>
  </DialogContent>
);
