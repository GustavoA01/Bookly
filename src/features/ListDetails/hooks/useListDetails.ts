import { getBooksFromList } from "@/src/services/firebase/books/getBooksFromList";
import { deleteList } from "@/src/services/firebase/lists/deleteList";
import { getListById } from "@/src/services/firebase/lists/getListById";
import { keys } from "@/src/services/keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useListDetails = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data: list } = useQuery({
    queryKey: [keys.queryKeys.listId, id],
    queryFn: () => getListById(id),
    enabled: !!id,
  });

  const { mutateAsync: deleteListFn } = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      setOpenDeleteDialog(false);
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists] });
      router.push("/?tab=lists");
    },
  });

  const booksExists = !!list && list.books.length > 0;

  const { data: books, isLoading: isBooksLoading } = useQuery({
    queryKey: [keys.queryKeys.listId, id, keys.queryKeys.books, list?.books],
    queryFn: () => getBooksFromList(list!.books),
    enabled: booksExists,
  });

  return {
    list,
    openEditModal,
    setOpenEditModal,
    books,
    isBooksLoading,
    openDeleteDialog,
    setOpenDeleteDialog,
    deleteListFn,
  };
};
