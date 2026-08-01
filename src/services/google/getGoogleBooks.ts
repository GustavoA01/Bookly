import { GoogleBooksResponse } from '../../data/types/api';
import {
  buildGoogleBooksUrl,
  EMPTY_GOOGLE_BOOKS_RESPONSE,
  GOOGLE_BOOKS_PAGE_SIZE,
} from './googleBooksConfig';

export class GoogleBooksRequestError extends Error {
  status: number;

  constructor(status: number, message = 'Google Books request failed') {
    super(message);
    this.name = 'GoogleBooksRequestError';
    this.status = status;
  }
}

export const getGoogleBooks = async (
  query: string,
  currentPage: number
): Promise<GoogleBooksResponse> => {
  const normalizedQuery = query?.trim();
  if (!normalizedQuery) return EMPTY_GOOGLE_BOOKS_RESPONSE;

  const startIndex = (currentPage - 1) * GOOGLE_BOOKS_PAGE_SIZE;
  const url = buildGoogleBooksUrl('', {
    q: normalizedQuery,
    startIndex: String(startIndex),
    maxResults: String(GOOGLE_BOOKS_PAGE_SIZE),
  });

  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new GoogleBooksRequestError(res.status);
  }

  const data = (await res.json()) as GoogleBooksResponse;
  return data.totalItems > 0 ? data : EMPTY_GOOGLE_BOOKS_RESPONSE;
};
