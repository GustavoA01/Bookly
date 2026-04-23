import { BookType } from '@/src/data/types/books';

export type ListsHeaderProps = {
  setOpenEditModal: (open: boolean) => void;
  setOpenDeleteDialog: (open: boolean) => void;
  setOpenDrawer: (open: boolean) => void;
  setOpenBooksModal: (open: boolean) => void;
};

export type ListInfoProps = {
  imageUrl: string | null;
  name: string;
  description: string | null;
  date: string;
};

export type BooksToAddListProps = {
  booksToAdd: BookType[] | undefined;
  isBooksToAddLoading: boolean;
  addToListFn: (params: {
    listId: string;
    bookId: string;
    action: 'add' | 'remove';
  }) => Promise<void>;
  listId: string;
};
