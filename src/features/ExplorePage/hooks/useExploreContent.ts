import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFetchBooks } from './useFetchBooks';

export const useExploreContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchText, setSearchText] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useFetchBooks({ query, currentPage });

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextQuery = searchText.trim();
      setQuery(nextQuery);
      setCurrentPage(1);

      const params = new URLSearchParams();
      if (nextQuery) params.set('q', nextQuery);
      const queryString = params.toString();
      window.history.replaceState(
        null,
        '',
        queryString ? `${pathname}?${queryString}` : pathname
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname, searchText]);

  return {
    searchText,
    setSearchText,
    books: data?.books || [],
    totalItems: data?.totalItems || 0,
    currentPage,
    isFetching,
    handlePageChange: setCurrentPage,
    query,
  };
};
