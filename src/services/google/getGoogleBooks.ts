import { GoogleBooksResponse } from '../../data/types/api';
import {
  buildGoogleBooksUrl,
  EMPTY_GOOGLE_BOOKS_RESPONSE,
  GOOGLE_BOOKS_PAGE_SIZE,
} from './googleBooksConfig';

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

  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) return EMPTY_GOOGLE_BOOKS_RESPONSE;

    const data = (await res.json()) as GoogleBooksResponse;
    return data.totalItems > 0 ? data : EMPTY_GOOGLE_BOOKS_RESPONSE;
  } catch {
    return EMPTY_GOOGLE_BOOKS_RESPONSE;
  }
};
