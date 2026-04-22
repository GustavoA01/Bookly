import { useState } from 'react';

export const useMenuActions = (
  setOpenSheet: (open: boolean) => void,
  setOpenModal: (open: boolean) => void
) => {
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

  return {
    openConfirmModal,
    setOpenConfirmModal,
    openUserNameDialog,
    setOpenUserNameDialog,
    openPasswordDialog,
    setOpenPasswordDialog,
    handleLogout,
    handleOpenUserNameDialog,
    handleOpenPasswordDialog,
  };
};
