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
  saleInfo?: {
    country: string;
    saleability: "FOR_SALE" | "NOT_FOR_SALE" | "FREE";
    isEbook: boolean;
    buyLink?: string;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
}

export type FormSearchParamsType = { id: string; role: "google" | "library" };

export type GeminiResponseType = {
  response: string;
  suggestions: { title: string; author: string }[];
};
