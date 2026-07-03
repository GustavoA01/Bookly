export interface GoogleBooksResponse {
  kind: 'books#volumes';
  totalItems: number;
  items?: GoogleBookItem[];
}

export interface GoogleBookItem {
  kind?: 'books#volume';
  id: string;
  etag?: string;
  selfLink?: string;
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
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
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
