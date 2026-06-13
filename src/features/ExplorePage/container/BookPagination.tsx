import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/pagination';
import { BookPaginationProps } from '../types';
import { useBookPagination } from '../hooks/useBookPagination';

export const BookPagination = ({
  currentPage: controlledCurrentPage,
  numberOfPages: controlledNumberOfPages,
  onPageChange,
}: BookPaginationProps) => {
  const {
    currentPage,
    initialPages,
    lastPages,
    middlePages,
    numberOfPages,
    pageProps,
  } = useBookPagination({
    controlledCurrentPage,
    controlledNumberOfPages,
    onPageChange,
  });

  return (
    <Pagination className="m-auto">
      <PaginationContent className="m-auto">
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious {...pageProps(currentPage - 1)} />
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink {...pageProps(1)}>1</PaginationLink>
            </PaginationItem>
            {currentPage - 2 !== 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {currentPage === 1 &&
          initialPages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === 1} {...pageProps(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {currentPage > 1 &&
          currentPage < numberOfPages &&
          middlePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                {...pageProps(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {currentPage === numberOfPages &&
          lastPages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                {...pageProps(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {currentPage < numberOfPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < numberOfPages && (
          <>
            {currentPage + 1 !== numberOfPages && (
              <PaginationItem>
                <PaginationLink {...pageProps(numberOfPages)}>
                  {numberOfPages}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext {...pageProps(currentPage + 1)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};
