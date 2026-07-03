export type UseFetchBooksParamsType = {
  query: string;
  currentPage: number;
};

export type BookPaginationProps = {
  currentPage: number;
  numberOfPages: number;
  onPageChange: (page: number) => void;
};

export type useBookPaginationParamsType = {
  controlledCurrentPage: number;
  controlledNumberOfPages: number;
  onPageChange: (page: number) => void;
};
