export type Status = "read" | "reading" | "abandoned" | "toRead";

export interface BookType {
  id: string;
  title: string;
  author: string | null;
  status: Status | null;
  rating: number | null;
  imageUrl: string | null;
  sinopse: string | null;
  comment: string | null;
}
