import { ListType } from '@/src/data/types/books';
import { createList } from '@/src/services/firebase/lists/createList';
import { updateList } from '@/src/services/firebase/lists/updateList';
import { keys } from '@/src/services/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from 'firebase/auth';
import { toast } from 'sonner';

export const useListMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createListFn } = useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists] });
      toast.success('Lista criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar a lista.');
    },
  });

  const { mutateAsync: updateListFn } = useMutation({
    mutationFn: (params: {
      list: Pick<ListType, 'name' | 'description' | 'imageUrl'>;
      listId: string;
      user: User;
    }) => updateList(params.list, params.listId, params.user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.listId] });
      toast.success('Lista atualizada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar a lista.');
    },
  });

  return {
    createListFn,
    updateListFn,
  };
};
