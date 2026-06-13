import { usePathname, useSearchParams } from 'next/navigation';
import { useBookPaginationParamsType } from '../types';

export const useBookPagination = ({
  controlledCurrentPage,
  controlledNumberOfPages,
  onPageChange,
}: useBookPaginationParamsType) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage =
    controlledCurrentPage || Number(searchParams.get('page') || '1');
  const numberOfPages =
    controlledNumberOfPages || (pathname.includes('/explorar') ? 6 : 3);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pageProps = (page: number) =>
    onPageChange
      ? {
          href: '#',
          onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            onPageChange(page);
          },
        }
      : { href: createPageUrl(page) };

  const initialPages = [1, 2, 3].filter((page) => page <= numberOfPages);
  const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page >= 1 && page <= numberOfPages
  );
  const lastPages = [
    numberOfPages - 2,
    numberOfPages - 1,
    numberOfPages,
  ].filter((page) => page >= 1);

  return {
    currentPage,
    numberOfPages,
    pageProps,
    initialPages,
    middlePages,
    lastPages,
  };
};
