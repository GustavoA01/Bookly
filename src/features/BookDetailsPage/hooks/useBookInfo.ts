import { auth } from "@/src/services/firebase/firebaseConfig";
import { getListsContainingBook } from "@/src/services/firebase/lists/getListsConteinsBooks";
import { keys } from "@/src/services/keys";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const useBookInfo = (
  id: string,
  currentPage: number | null,
  totalPages: number | null,
) => {
  const pathname = usePathname();
  const isBooksDetailsPage = pathname.includes("/livro/");
  const user = auth.currentUser;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data: listsContainingBook } = useQuery({
    queryKey: [keys.queryKeys.lists, id],
    queryFn: () => getListsContainingBook(id, user!.uid),
    enabled: isBooksDetailsPage,
  });

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
  };
};
