import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useFetchBooks } from './useFetchBooks';

export const useExploreContent = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const parsedUrlPage = Number(searchParams.get('page') || '1');
  const urlPage =
    Number.isFinite(parsedUrlPage) && parsedUrlPage > 0 ? parsedUrlPage : 1;
  const [searchText, setSearchText] = useState(urlQuery);
  const [query, setQuery] = useState(urlQuery);
  const [currentPage, setCurrentPage] = useState(urlPage);
  const { data, isFetching } = useFetchBooks({ query, currentPage });

  const updateUrl = useCallback(
    (nextQuery: string, nextPage: number) => {
      const params = new URLSearchParams();

      if (nextQuery) params.set('q', nextQuery);
      if (nextPage > 1) params.set('page', String(nextPage));

      const queryString = params.toString();
      replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, replace]
  );

  useEffect(() => {
    const normalizedSearch = searchText.trim();

    if (normalizedSearch === query) return;

    const timer = setTimeout(() => {
      setQuery(normalizedSearch);
      setCurrentPage(1);
      updateUrl(normalizedSearch, 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchText, updateUrl]);

  const books = data?.books || [];
  const totalItems = data?.totalItems || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl(query, page);
  };

  return {
    searchText,
    setSearchText,
    books,
    totalItems,
    currentPage,
    isFetching,
    handlePageChange,
    query,
  };
};
