import { GoogleBooksResponse } from '../../data/types/api';
import { getOpenLibraryBooks } from '../openLibrary/getOpenLibraryBooks';
import {
  buildGoogleBooksUrl,
  GOOGLE_BOOKS_PAGE_SIZE,
} from './googleBooksConfig';

export const getGoogleBooks = async (
  query: string,
  currentPage: number
): Promise<GoogleBooksResponse | null> => {
  const normalizedQuery = query?.trim();
  if (!normalizedQuery) return null;

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

    if (!res.ok) return getOpenLibraryBooks(normalizedQuery, startIndex);

    const data = (await res.json()) as GoogleBooksResponse;
    return data.totalItems > 0
      ? data
      : getOpenLibraryBooks(normalizedQuery, startIndex);
  } catch {
    return getOpenLibraryBooks(normalizedQuery, startIndex);
  }
};
