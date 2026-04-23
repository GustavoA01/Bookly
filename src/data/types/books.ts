import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Timestamp } from 'firebase/firestore';
import { LucideProps } from 'lucide-react';

export interface BookType {
  id: string;
  title: string;
  author: string | null;
  genre: string | null;
  status: Status;
  rating: number | null;
  imageUrl: string | null;
  synopsis: string | null;
  comment: string | null;
  currentPage: number | null;
  totalPages: number | null;
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  imagePublicId: string | null;
  createdAt: Timestamp;
  userId: string;
}

export interface ListType {
  id: string;
  name: string;
  description: string | null;
  books: string[];
  imageUrl: string | null;
  imagePublicId: string | null;
  createdAt: Timestamp;
  userId: string;
}

export type Status = 'read' | 'reading' | 'abandoned' | 'toRead';

export type StatusPropsType = {
  bgColor: string;
  textColor: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

export type FilterOptionsType =
  | 'all'
  | 'title'
  | 'author'
  | 'rating'
  | 'startDate'
  | 'endDate'
  | 'createdAt';
