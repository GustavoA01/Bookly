import { GoogleBooksResponse } from '@/src/data/types/api';
import { keys } from '@/src/services/keys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { UseFetchBooksParamsType } from '../types';

const DEFAULT_EXPLORE_QUERY = 'fiction';

const fetchBooksFromApi = async (query: string, page: number) => {
  const res = await fetch(
    `/api/books/search?q=${encodeURIComponent(query)}&page=${page}`
  );

  if (!res.ok) throw new Error('Falha ao buscar livros');

  return (await res.json()) as GoogleBooksResponse;
};

export const useFetchBooks = ({
  currentPage,
  query,
}: UseFetchBooksParamsType) => {
  const { data, isFetching } = useQuery({
    queryKey: [keys.queryKeys.exploreBooks, query, currentPage],
    queryFn: async () => {
      const searchQuery = query || DEFAULT_EXPLORE_QUERY;
      const response = await fetchBooksFromApi(searchQuery, currentPage);
      const books = response.items || [];

      return {
        books,
        totalItems: response.totalItems || books.length,
      };
    },
    placeholderData: keepPreviousData,
    retry: 2,
    retryDelay: (attempt) => 400 * (attempt + 1),
  });

  return { data, isFetching };
};
