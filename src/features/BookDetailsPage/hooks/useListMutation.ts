import { useAuth } from "@/src/contexts/AuthProvider";
import { getListsContainingBook } from "@/src/services/firebase/lists/getListsConteinsBooks";
import { updateListBooks } from "@/src/services/firebase/lists/updateListBooks";
import { keys } from "@/src/services/keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useListMutation = (id: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const isBooksDetailsPage = pathname.includes("/livro/");
  const [listIdToRemove, setListIdToRemove] = useState<string>("");
  const [openRemoveBookModal, setOpenRemoveBookModal] = useState(false);
  const [openOptionsDrawer, setOpenOptionsDrawer] = useState(false);

  const { data: listsContainingBook } = useQuery({
    queryKey: [keys.queryKeys.lists, id],
    queryFn: () => getListsContainingBook(id, user!.uid),
    enabled: isBooksDetailsPage,
  });

  const { mutateAsync: deleteListFn } = useMutation({
    mutationFn: () => updateListBooks(listIdToRemove, id, "remove"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [keys.queryKeys.listId, listIdToRemove],
      });
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists, id] });
      setOpenRemoveBookModal(false);
      toast.success("Livro removido da lista");
    },
  });

  return {
    listsContainingBook,
    deleteListFn,
    openRemoveBookModal,
    setOpenRemoveBookModal,
    isBooksDetailsPage,
    setListIdToRemove,
    openOptionsDrawer,
    setOpenOptionsDrawer,
  };
};
