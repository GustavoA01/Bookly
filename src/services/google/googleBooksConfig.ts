export const GOOGLE_BOOKS_ENDPOINT =
  'https://www.googleapis.com/books/v1/volumes';
export const GOOGLE_BOOKS_COUNTRY = 'BR';
export const GOOGLE_BOOKS_PAGE_SIZE = 12;

const getGoogleBooksApiKey = () => process.env.GOOGLE_BOOKS_API_KEY;

export const buildGoogleBooksUrl = (
  path = '',
  params?: Record<string, string>
) => {
  const url = new URL(`${GOOGLE_BOOKS_ENDPOINT}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const apiKey = getGoogleBooksApiKey();
  if (apiKey) url.searchParams.set('key', apiKey);

  url.searchParams.set('country', GOOGLE_BOOKS_COUNTRY);

  return url.toString();
};
