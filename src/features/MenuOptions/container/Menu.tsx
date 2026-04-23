import { Dialog, DialogContent } from '../../../components/ui/dialog';
import { ConfirmLogout } from '../../../components/ConfirmLogout';
import { Drawer } from '../../../components/ui/drawer';
import { DrawerMenu } from '../components/DrawerMenu';
import { DialogMenu } from '../components/DialogMenu';
import { NameForm } from './NameForm';
import { PasswordForm } from './PasswordForm';
import { useMenuActions } from '../hooks/useMenuActions';
import { MenuProps } from '../types';

export const Menu = ({
  user,
  openSheet,
  openModal,
  setOpenSheet,
  setOpenModal,
}: MenuProps) => {
  const {
    handleLogout,
    handleOpenPasswordDialog,
    handleOpenUserNameDialog,
    openConfirmModal,
    openPasswordDialog,
    openUserNameDialog,
    setOpenConfirmModal,
    setOpenPasswordDialog,
    setOpenUserNameDialog,
  } = useMenuActions(setOpenSheet, setOpenModal);

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

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogMenu
          user={user}
          handleLogout={handleLogout}
          handleOpenUserDialog={handleOpenUserNameDialog}
          handleOpenPasswordDialog={handleOpenPasswordDialog}
        />
      </Dialog>

      <Dialog open={openUserNameDialog} onOpenChange={setOpenUserNameDialog}>
        <DialogContent>
          <NameForm />
        </DialogContent>
      </Dialog>
      <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
        <DialogContent>
          <PasswordForm />
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
        <ConfirmLogout setCloseModal={setOpenConfirmModal} />
      </Dialog>
    </>
  );
};
