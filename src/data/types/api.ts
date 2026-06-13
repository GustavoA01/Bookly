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
    saleability: 'FOR_SALE' | 'NOT_FOR_SALE' | 'FREE';
    isEbook: boolean;
    buyLink?: string;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
}

export type FormSearchParamsType = { id: string; role: 'google' | 'library' };

export type GeminiResponseType = {
  response: string;
  suggestions: { title: string; author: string }[];
};

export type SuggestionsResponseType = {
  chatResponse: string;
  suggestions: GoogleBookItem[];
};

export type ChatMessageType = {
  id: string;
  messages: { sender: 'user' | 'bot'; text: string; timestamp: Date }[];
  suggestions: GoogleBookItem[];
};

export type OpenLibraryWorkType = {
  key?: string;
  title?: string;
  description?: string | { value?: string };
  subjects?: string[];
  covers?: number[];
  first_publish_date?: string;
  location?: string;
  authors?: { author?: { key?: string } }[];
};

export type OpenLibraryAuthorType = {
  name?: string;
  personal_name?: string;
  fuller_name?: string;
};

export type OpenLibraryEditionType = {
  publishers?: string[];
  publish_date?: string;
  number_of_pages?: number;
  languages?: { key?: string }[];
  covers?: number[];
};

export type OpenLibraryEditionsResponseType = {
  entries?: OpenLibraryEditionType[];
};

export type OpenLibraryDocType = {
  key?: string;
  title?: string;
  author_name?: string[];
  subject?: string[];
  ratings_average?: number;
  cover_i?: number;
  language?: string[];
  first_publish_year?: number;
  first_sentence?: string | string[];
  number_of_pages_median?: number;
};

export type OpenLibraryResponseType = {
  numFound: number;
  docs?: OpenLibraryDocType[];
};
