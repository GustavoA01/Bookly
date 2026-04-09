import { useAuth } from '@/src/data/contexts/AuthProvider';
import { deleteBook } from '@/src/services/firebase/books/deleteBook';
import { keys } from '@/src/services/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useDeleteBook = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const params = useParams();
  const id = String(params.id);

  const { mutateAsync: deleteBookFn } = useMutation({
    mutationFn: (params: { id: string; user: User | null }) => deleteBook(params.id, params.user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.books] });
      toast.success('Livro deletado');
      router.back();
    },
  });

  return {
    id,
    openDeleteDialog,
    setOpenDeleteDialog,
    deleteBookFn: () => deleteBookFn({ id, user }),
  };
};
