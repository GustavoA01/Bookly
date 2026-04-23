import { User } from 'firebase/auth';

export type MenuProps = {
  user: User | null;
  openSheet: boolean;
  openModal: boolean;
  setOpenSheet: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
};

export type UserIconProps = {
  user: User | null;
  isLoading: boolean;
  setOpenSheet: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
};

export type OptionsProps = {
  handleOpenUserDialog: () => void;
  handleOpenPasswordDialog: () => void;
};

export type DrawerMenuProps = {
  user: User | null;
  handleLogout: () => void;
  handleOpenUserDialog: () => void;
  handleOpenPasswordDialog: () => void;
};

export type DialogMenuProps = {
  user: User | null;
  handleLogout: () => void;
  handleOpenUserDialog: () => void;
  handleOpenPasswordDialog: () => void;
};
