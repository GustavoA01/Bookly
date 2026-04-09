import { User } from 'firebase/auth';
import { Drawer } from '../../../components/ui/drawer';
import { DrawerMenu } from './DrawerMenu';
import { Dialog, DialogContent, DialogTitle } from '../../../components/ui/dialog';
import { DialogMenu } from './DialogMenu';
import { ConfirmLogout } from '../../../components/ConfirmLogout';
import { useState } from 'react';

type MenuProps = {
  user: User | null;
  openSheet: boolean;
  openModal: boolean;
  setOpenSheet: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
};

export const Menu = ({ user, openSheet, openModal, setOpenSheet, setOpenModal }: MenuProps) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openUserNameDialog, setOpenUserNameDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const handleLogout = () => setOpenConfirmModal(true);

  const handleOpenUserNameDialog = () => {
    setOpenSheet(false);
    setOpenModal(false);
    setOpenUserNameDialog(true);
  };

  const handleOpenPasswordDialog = () => {
    setOpenSheet(false);
    setOpenModal(false);
    setOpenPasswordDialog(true);
  };

  return (
    <>
      <Drawer open={openSheet} onOpenChange={setOpenSheet}>
        <DrawerMenu
          user={user}
          handleLogout={handleLogout}
          handleOpenUserDialog={handleOpenUserNameDialog}
          handleOpenPasswordDialog={handleOpenPasswordDialog}
        />
      </Drawer>

      <Dialog open={openUserNameDialog} onOpenChange={setOpenUserNameDialog}>
        <DialogContent>
          <DialogTitle>Alterar nome de usuário</DialogTitle>
        </DialogContent>
      </Dialog>
      <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
        <DialogContent>
          <DialogTitle>Alterar senha</DialogTitle>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogMenu
          user={user}
          handleLogout={handleLogout}
          handleOpenUserDialog={handleOpenUserNameDialog}
          handleOpenPasswordDialog={handleOpenPasswordDialog}
        />
      </Dialog>
      <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
        <ConfirmLogout setCloseModal={setOpenConfirmModal} />
      </Dialog>
    </>
  );
};
