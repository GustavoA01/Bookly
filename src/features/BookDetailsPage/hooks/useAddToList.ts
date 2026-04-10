import { getLists } from '@/src/services/firebase/lists/getLists';
import { updateListBooks } from '@/src/services/firebase/lists/updateListBooks';
import { keys } from '@/src/services/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'sonner';

type UseAddListContentType = {
  id?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useAddToList = ({ id, open, setOpen }: UseAddListContentType) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [keys.queryKeys.lists],
    queryFn: getLists,
    enabled: open,
  });

  const { mutateAsync: addToListFn } = useMutation({
    mutationFn: (params: {
      listId: string;
      bookId: string;
      action: 'add' | 'remove';
    }) => updateListBooks(params.listId, params.bookId!, params.action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists] });
      setOpen(false);
      toast.success('Livro adicionado à lista com sucesso');
    },
  });

  const lists = useMemo(() => {
    if (data?.length === 0) return undefined;

    return data?.filter((list) => !list.books.includes(id!));
  }, [data, id]);

  return {
    lists,
    isLoading,
    addToListFn,
  };
};
