import { useAuth } from '@/src/data/contexts/AuthProvider';
import { BookType, ListType } from '@/src/data/types/books';
import { getListsContainingBook } from '@/src/services/firebase/lists/getListsConteinsBooks';
import { updateListBooks } from '@/src/services/firebase/lists/updateListBooks';
import { keys } from '@/src/services/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useListMutation = (id: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const isBooksDetailsPage = pathname.includes('/livro/');
  const [listIdToRemove, setListIdToRemove] = useState<string>('');
  const [openRemoveBookModal, setOpenRemoveBookModal] = useState(false);
  const [openOptionsDrawer, setOpenOptionsDrawer] = useState(false);

  const { data: listsContainingBook } = useQuery({
    queryKey: [keys.queryKeys.lists, id],
    queryFn: () => getListsContainingBook(id, user!.uid),
    enabled: isBooksDetailsPage,
  });

  const { mutateAsync: deleteListFn } = useMutation({
    mutationFn: () => updateListBooks(listIdToRemove, id, 'remove'),
    onSuccess: async () => {
      const listQueryKey = [keys.queryKeys.listId, listIdToRemove];

      queryClient.setQueryData<ListType | null>(listQueryKey, (currentList) =>
        currentList
          ? {
              ...currentList,
              books: currentList.books.filter((bookId) => bookId !== id),
            }
          : currentList
      );

      queryClient.setQueriesData<BookType[]>(
        {
          predicate: (query) =>
            query.queryKey[0] === keys.queryKeys.booksInList &&
            query.queryKey[1] === listIdToRemove,
        },
        (currentBooks) => (currentBooks || []).filter((book) => book.id !== id)
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: listQueryKey }),
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === keys.queryKeys.booksInList &&
            query.queryKey[1] === listIdToRemove,
        }),
        queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists, id] }),
        queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists] }),
      ]);

      setOpenRemoveBookModal(false);
      toast.success('Livro removido da lista');
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
