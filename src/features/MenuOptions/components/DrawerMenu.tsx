import { LogIn } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { DrawerClose, DrawerContent, DrawerTitle } from '../../../components/ui/drawer';
import { User } from 'firebase/auth';
import { Options } from './Options';

type DrawerMenuProps = {
  user: User | null;
  handleLogout: () => void;
  handleOpenUserDialog: () => void;
  handleOpenPasswordDialog: () => void;
};

export const DrawerMenu = ({ user, handleLogout, handleOpenUserDialog, handleOpenPasswordDialog }: DrawerMenuProps) => (
  <DrawerContent className="p-4">
    <DrawerTitle>{user?.displayName}</DrawerTitle>
    <div className="flex flex-col gap-2 mt-4">
      <Options handleOpenUserDialog={handleOpenUserDialog} handleOpenPasswordDialog={handleOpenPasswordDialog} />
      <DrawerClose asChild>
        <Button variant="destructive" onClick={handleLogout}>
          <LogIn />
          <p>Sair</p>
        </Button>
      </DrawerClose>
    </div>
  </DrawerContent>
);
