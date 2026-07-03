import { GoogleBooksResponse } from '@/src/data/types/api';
import { getOpenLibraryBooks } from '@/src/services/openLibrary/getOpenLibraryBooks';
import { keys } from '@/src/services/keys';
import { useQuery } from '@tanstack/react-query';
import { UseFetchBooksParamsType } from '../types';

const DEFAULT_EXPLORE_QUERY = 'fiction';

const fetchBooksFromApi = async (query: string, page: number) => {
  const res = await fetch(
    `/api/books/search?q=${encodeURIComponent(query)}&page=${page}`
  );

  if (!res.ok) return null;

  return (await res.json()) as GoogleBooksResponse;
};

export const useFetchBooks = ({
  currentPage,
  query,
  PAGE_SIZE,
}: UseFetchBooksParamsType) => {
  const { data, isFetching } = useQuery({
    queryKey: [keys.queryKeys.exploreBooks, query, currentPage],
    queryFn: async () => {
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const response = query
        ? await fetchBooksFromApi(query, currentPage)
        : await getOpenLibraryBooks(DEFAULT_EXPLORE_QUERY, startIndex);
      const books = response?.items || [];

      return {
        books,
        totalItems: response?.totalItems || books.length,
      };
    },
    placeholderData: (previousData) => previousData,
  });

  return { data, isFetching };
};
