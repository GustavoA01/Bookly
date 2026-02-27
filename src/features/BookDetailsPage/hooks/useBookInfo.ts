import { useState } from "react";
import { useListMutation } from "./useListMutation";

export const useBookInfo = (
  id: string,
  currentPage: number | null,
  totalPages: number | null,
) => {
  const {
    listsContainingBook,
    deleteListFn,
    openRemoveBookModal,
    setOpenRemoveBookModal,
    isBooksDetailsPage,
    setListIdToRemove,
    openOptionsDrawer,
    setOpenOptionsDrawer,
  } = useListMutation(id);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const progress =
    currentPage && totalPages
      ? Math.floor((currentPage * 100) / totalPages)
      : null;

  return {
    isBooksDetailsPage,
    openDrawer,
    setOpenDrawer,
    openModal,
    setOpenModal,
    listsContainingBook,
    progress,
    openRemoveBookModal,
    setOpenRemoveBookModal,
    deleteListFn,
    setListIdToRemove,
    openOptionsDrawer,
    setOpenOptionsDrawer,
  };
};
