import { LogIn } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../../../components/ui/drawer';
import { Options } from './Options';
import { DrawerMenuProps } from '../types';

export const DrawerMenu = ({
  user,
  handleLogout,
  handleOpenUserDialog,
  handleOpenPasswordDialog,
}: DrawerMenuProps) => (
  <DrawerContent className="p-4">
    <DrawerHeader>
      <DrawerTitle>{user?.displayName}</DrawerTitle>
      <DrawerDescription>{user?.email}</DrawerDescription>
    </DrawerHeader>
    <div className="flex flex-col gap-2 mt-4">
      <Options
        handleOpenUserDialog={handleOpenUserDialog}
        handleOpenPasswordDialog={handleOpenPasswordDialog}
      />
      <DrawerClose asChild>
        <Button variant="destructive" onClick={handleLogout}>
          <LogIn />
          <p>Sair</p>
        </Button>
      </DrawerClose>
    </div>
  </DrawerContent>
);
