import { BookType } from '@/src/data/types/books';

export type BookTableProps = {
  books: BookType[] | undefined;
  isBooksLoading: boolean;
  isUserLoading?: boolean;
};

export type BookRowProps = Pick<
  BookType,
  'id' | 'title' | 'author' | 'createdAt' | 'genre' | 'status' | 'rating'
>;
