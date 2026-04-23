import { Dispatch, SetStateAction } from 'react';
import { BookType, Status } from './books';
import { User } from 'firebase/auth';

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

export type TabsNavProps = { tab: string | undefined };

export type StatusSelectProps = {
  isHome?: boolean;
  className?: string;
  value: Status | '';
  onValueChange: Dispatch<SetStateAction<Status>>;
};

export type StatusChipProps = {
  status: Status;
  className?: string;
};

export type SearchBookCardProps = Pick<
  BookType,
  'id' | 'title' | 'author' | 'genre' | 'imageUrl' | 'rating'
>;

export type ProvidersProps = { children: React.ReactNode };

export type FormErrorMessageProps = {
  showMessage: boolean;
  message: string | undefined | null;
  className?: string;
};

export type ConfirmLogoutProps = {
  setCloseModal: (open: boolean) => void;
};

export type BookCardsListProps = {
  query: string;
  currentPage: number;
};
