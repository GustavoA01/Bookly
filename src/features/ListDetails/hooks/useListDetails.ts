import { useAuth } from '@/src/data/contexts/AuthProvider';
import { getBooksFromList } from '@/src/services/firebase/books/getBooksFromList';
import { getBooksNotInList } from '@/src/services/firebase/books/getBooksNotInList';
import { deleteList } from '@/src/services/firebase/lists/deleteList';
import { getListById } from '@/src/services/firebase/lists/getListById';
import { updateListBooks } from '@/src/services/firebase/lists/updateListBooks';
import { keys } from '@/src/services/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useListDetails = (id: string) => {
  const { user } = useAuth();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openBooksModal, setOpenBooksModal] = useState(false);
  const [openBooksDrawer, setOpenBooksDrawer] = useState(false);

  const { data: list, isLoading: isListLoading } = useQuery({
    queryKey: [keys.queryKeys.listId, id],
    queryFn: () => getListById(id),
    enabled: !!id,
  });

  const enableBooksQuery =
    !!list && !!user?.uid && (openBooksDrawer || openBooksModal);
  const { data: booksToAdd, isLoading: isBooksToAddLoading } = useQuery({
    queryKey: [keys.queryKeys.booksToAdd],
    queryFn: () => getBooksNotInList(list?.id as string, user?.uid as string),
    enabled: enableBooksQuery,
  });

  const { mutateAsync: deleteListFn } = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      setOpenDeleteDialog(false);
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists] });
      push('/?tab=lists');
    },
  });

  const { mutateAsync: addToListFn } = useMutation({
    mutationFn: (params: {
      listId: string;
      bookId: string;
      action: 'add' | 'remove';
    }) => updateListBooks(params.listId, params.bookId, params.action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists, id] });
      queryClient.invalidateQueries({
        queryKey: [keys.queryKeys.booksInList, id],
      });
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.booksToAdd] });
      setOpenBooksModal(false);
      setOpenBooksDrawer(false);

      toast.success('Livro adicionado à lista');
    },
    onError: (error) => {
      setOpenBooksModal(false);
      setOpenBooksDrawer(false);
      console.error(error);
      toast.error('Erro ao atualizar a lista');
    },
  });

  const booksExists = !!list && list.books.length > 0;

  const { data: books, isLoading: isBooksLoading } = useQuery({
    queryKey: [keys.queryKeys.booksInList, id],
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
    isListLoading,
    openBooksModal,
    setOpenBooksModal,
    openBooksDrawer,
    setOpenBooksDrawer,
    booksToAdd,
    isBooksToAddLoading,
    addToListFn,
  };
};
