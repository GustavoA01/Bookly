import { BookType } from '@/src/data/types/books';
import { useAuth } from '@/src/data/contexts/AuthProvider';
import { createBook } from '@/src/services/firebase/books/createBook';
import { updateBook } from '@/src/services/firebase/books/updateBook';
import { keys } from '@/src/services/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useBookMutation = (id: string) => {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: createBookFn } = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      toast.success('Livro adicionado!');
      router.push('/');
    },
    onError: () => {
      toast.error('Erro ao adicionar o livro');
    },
  });

  const { mutateAsync: updateBookFn } = useMutation({
    mutationFn: (book: Omit<BookType, 'userId' | 'id' | 'createdAt'>) =>
      updateBook(book, id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.books] });
      toast.success('Livro atualizado!');
    },
    onError: () => {
      toast.error('Erro ao atualizar o livro');
    },
  });

  return {
    createBookFn,
    updateBookFn,
  };
};
