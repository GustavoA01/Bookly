import { useAuth } from '@/src/data/contexts/AuthProvider';
import { FilterOptionsType, Status } from '@/src/data/types/books';
import { getBooks } from '@/src/services/firebase/books/getBooks';
import { keys } from '@/src/services/keys';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useBookTab = () => {
  const { user, isLoading: isUserLoading } = useAuth();
  const [searchBookText, setSearchBookText] = useState('');
  const [status, setStatus] = useState<Status | ''>('');
  const [filter, setFilter] = useState<FilterOptionsType | ''>('');
  const redirecHref = user ? '/novo-livro' : '/login';

  const { data, isLoading: isBooksLoading } = useQuery({
    queryKey: [keys.queryKeys.books, status, filter],
    queryFn: () => getBooks(user, filter, status),
    enabled: !!user,
  });

  const books =
    searchBookText === ''
      ? data
      : data?.filter((book) => {
          const searhTextLower = searchBookText.toLowerCase();
          const bookTitle = book.title.toLowerCase();
          if (book.author)
            return bookTitle.includes(searhTextLower) || book.author.toLowerCase().includes(searhTextLower);
          return bookTitle.includes(searhTextLower);
        });

  return {
    setSearchBookText,
    status,
    books,
    isBooksLoading,
    isUserLoading,
    redirecHref,
    filter,
    setFilter,
    setStatus,
  };
};
