import { GoogleBooksResponse } from '../../data/types/api';
import { getOpenLibraryBooks } from '../openLibrary/getOpenLibraryBooks';

const GOOGLE_BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';
const PAGE_SIZE = 12;

export const getGoogleBooks = async (
  query: string,
  currentPage: number
): Promise<GoogleBooksResponse | null> => {
  const normalizedQuery = query?.trim();
  if (!normalizedQuery) return null;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const params = new URLSearchParams({
    q: normalizedQuery,
    startIndex: String(startIndex),
    maxResults: String(PAGE_SIZE),
  });

  try {
    const res = await fetch(`${GOOGLE_BOOKS_ENDPOINT}?${params.toString()}`, {
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
