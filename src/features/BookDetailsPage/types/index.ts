import { BookType, ListType, Status } from '@/src/data/types/books';
import { JSX } from 'react';

export type UseAddListContentType = {
  id?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type AddBuyButtonProps = {
  id?: string;
  buyLink?: string;
};

export type AddListContentProps = {
  id?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type BookDetailsProps = Omit<
  BookType,
  'status' | 'createdAt' | 'userId' | 'imagePublicId'
> & {
  status?: Status;
  buyLink?: string;
  publisher?: string;
  country?: string;
  language?: string;
};

export type BookSynopsisProps = {
  synopsis: string | null;
  comment: string | null;
};

export type BookHeaderProps = Pick<BookType, 'title' | 'author' | 'rating'> & {
  isImageNull: boolean;
  status?: Status;
};

export type BookInfoProps = Pick<
  BookType,
  'currentPage' | 'totalPages' | 'startDate' | 'endDate' | 'genre'
> & {
  id?: string;
  isSynopsisAndCommentNull: boolean;
  buyLink?: string;
  publisher?: string;
  country?: string;
  language?: string;
};

export type TimeInfoProps = Pick<BookType, 'startDate' | 'endDate'> & {
  progress: number | null;
};

export type PublisherInfoProps = {
  publisher?: string;
  country?: string;
  language?: string;
};

export type ListOptionsProps = {
  listId: string;
  setOpenRemoveBookModal: (open: boolean) => void;
  setListIdToRemove: (id: string) => void;
};

export type ListInfoProps = {
  lists: ListType[] | undefined;
  setOpenDrawer: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
  setOpenRemoveBookModal: (open: boolean) => void;
  setListIdToRemove: (id: string) => void;
  openOptionsDrawer: boolean;
  setOpenOptionsDrawer: (open: boolean) => void;
};

export type InfoSectionProps = {
  label: string;
  value: string;
  icon: JSX.Element;
};

export type DrawerListOptionsProps = {
  listId: string;
  listName: string;
  setOpenOptionsDrawer: (open: boolean) => void;
  setOpenRemoveBookModal: (open: boolean) => void;
  setListIdToRemove: (id: string) => void;
};

export type DetailsInfoProps = Pick<
  BookType,
  'currentPage' | 'totalPages' | 'genre'
>;
