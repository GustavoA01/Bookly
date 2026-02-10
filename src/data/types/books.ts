export type Status = "read" | "reading" | "abandoned" | "toRead";

export interface BookType {
  id: string;
  title: string;
  author: string | null;
  genre: string | null;
  status: Status | null;
  rating: number | null;
  imageUrl: string | null;
  sinopse: string | null;
  comment: string | null;
  currentPage: number | null;
  totalPages: number | null;
  startDate: string | null;
  endDate: string | null;
}

export type FormSearchParamsType = { id: string; role: "google" | "firebase" };
