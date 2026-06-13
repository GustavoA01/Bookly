import { useAuth } from '@/src/data/contexts/AuthProvider';
import { BookType, ListType } from '@/src/data/types/books';
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

  const listQueryKey = [keys.queryKeys.listId, id];
  const booksToAddQueryKey = [keys.queryKeys.booksToAdd, id, user?.uid];

  const { data: list, isLoading: isListLoading } = useQuery({
    queryKey: listQueryKey,
    queryFn: () => getListById(id),
    enabled: !!id,
  });

  const listBookIds = list?.books || [];
  const booksInListQueryKey = [
    keys.queryKeys.booksInList,
    id,
    listBookIds.join('|'),
  ];

  const enableBooksQuery =
    !!list && !!user?.uid && (openBooksDrawer || openBooksModal);
  const { data: booksToAdd, isLoading: isBooksToAddLoading } = useQuery({
    queryKey: booksToAddQueryKey,
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
    onSuccess: async (_, params) => {
      const selectedBook = booksToAdd?.find(
        (book) => book.id === params.bookId
      );
      const currentList = queryClient.getQueryData<ListType | null>(
        listQueryKey
      );
      const nextBookIds = currentList?.books.includes(params.bookId)
        ? currentList.books
        : [...(currentList?.books || []), params.bookId];
      const nextBooksInListQueryKey = [
        keys.queryKeys.booksInList,
        id,
        nextBookIds.join('|'),
      ];

      if (params.action === 'add') {
        queryClient.setQueryData<ListType | null>(
          listQueryKey,
          (currentList) =>
            currentList
              ? {
                  ...currentList,
                  books: currentList.books.includes(params.bookId)
                    ? currentList.books
                    : [...currentList.books, params.bookId],
                }
              : currentList
        );

        if (selectedBook) {
          const addSelectedBook = (currentBooks: BookType[] | undefined) => {
            const previousBooks = currentBooks || [];
            return previousBooks.some((book) => book.id === selectedBook.id)
              ? previousBooks
              : [...previousBooks, selectedBook];
          };

          queryClient.setQueryData<BookType[]>(
            booksInListQueryKey,
            addSelectedBook
          );
          queryClient.setQueryData<BookType[]>(
            nextBooksInListQueryKey,
            addSelectedBook
          );
          queryClient.setQueryData<BookType[]>(
            booksToAddQueryKey,
            (currentBooks) =>
              (currentBooks || []).filter((book) => book.id !== selectedBook.id)
          );
        }
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: listQueryKey }),
        queryClient.invalidateQueries({ queryKey: booksToAddQueryKey }),
        queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists] }),
      ]);

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

  const { data: books, isLoading: isBooksLoading } = useQuery({
    queryKey: booksInListQueryKey,
    queryFn: () => getBooksFromList(listBookIds),
    enabled: !!list,
    placeholderData: (previousBooks) => previousBooks,
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
