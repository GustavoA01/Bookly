import { JSX } from "react";

export type Status = "read" | "reading" | "abandoned" | "toRead";

export interface BookType {
  id: string;
  title: string;
  author: string | null;
  genre: string | null;
  status: Status;
  rating: number | null;
  imageUrl: string | null;
  sinopse: string | null;
  comment: string | null;
  currentPage: number | null;
  totalPages: number | null;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

export type StatusPropsType = {
  bgColor: string;
  textColor: string;
  label: string;
  icon: JSX.Element;
};

export type FilterOptionsType =
  | "all"
  | "title"
  | "author"
  | "rating"
  | "startDate"
  | "endDate"
  | "createdAt";
