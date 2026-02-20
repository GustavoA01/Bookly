import { deleteBook } from "@/src/services/firebase/books/deleteBook";
import { keys } from "@/src/services/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const params = useParams();
  const id = String(params.id);

  const { mutateAsync: deleteBookFn } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.books] });
      router.back();
    },
  });

  return {
    id,
    openDeleteDialog,
    setOpenDeleteDialog,
    deleteBookFn: () => deleteBookFn(id),
  };
};
