import { GoogleBooksResponse } from '../../data/types/api';
import {
  buildGoogleBooksUrl,
  EMPTY_GOOGLE_BOOKS_RESPONSE,
  GOOGLE_BOOKS_PAGE_SIZE,
} from './googleBooksConfig';

const MAX_RETRIES = 2;
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

export class GoogleBooksRequestError extends Error {
  status: number;

  constructor(status: number, message = 'Google Books request failed') {
    super(message);
    this.name = 'GoogleBooksRequestError';
    this.status = status;
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getGoogleBooks = async (
  query: string,
  currentPage: number
): Promise<GoogleBooksResponse> => {
  const normalizedQuery = query?.trim();
  if (!normalizedQuery) return EMPTY_GOOGLE_BOOKS_RESPONSE;

  if (!process.env.GOOGLE_BOOKS_API_KEY) {
    throw new GoogleBooksRequestError(
      500,
      'GOOGLE_BOOKS_API_KEY is not configured'
    );
  }

  const startIndex = (currentPage - 1) * GOOGLE_BOOKS_PAGE_SIZE;
  const url = buildGoogleBooksUrl('', {
    q: normalizedQuery,
    startIndex: String(startIndex),
    maxResults: String(GOOGLE_BOOKS_PAGE_SIZE),
  });

  let lastStatus = 500;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = (await res.json()) as GoogleBooksResponse;
      return data.totalItems > 0 ? data : EMPTY_GOOGLE_BOOKS_RESPONSE;
    }

    lastStatus = res.status;

    if (!RETRYABLE_STATUS.has(res.status) || attempt === MAX_RETRIES) {
      break;
    }

    await wait(300 * (attempt + 1));
  }

  throw new GoogleBooksRequestError(lastStatus);
};
