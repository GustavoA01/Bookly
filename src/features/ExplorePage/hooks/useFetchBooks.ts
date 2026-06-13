import { getGoogleBooks } from '@/src/services/google/getGoogleBooks';
import { getOpenLibraryBooks } from '@/src/services/openLibrary/getOpenLibraryBooks';
import { keys } from '@/src/services/keys';
import { useQuery } from '@tanstack/react-query';
import { UseFetchBooksParamsType } from '../types';

const DEFAULT_EXPLORE_QUERY = 'fiction';

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
        ? await getGoogleBooks(query, currentPage)
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
