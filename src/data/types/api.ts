export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBookItem[];
}

export interface GoogleBookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    previewLink: string;
  };
}

export type FormSearchParamsType = { id: string; role: "google" | "firebase" };
