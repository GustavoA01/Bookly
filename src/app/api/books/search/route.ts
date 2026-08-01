import {
  getGoogleBooks,
  GoogleBooksRequestError,
} from '@/src/services/google/getGoogleBooks';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.trim() || '';
  const page = Number(searchParams.get('page') || '1');

  if (!query) {
    return Response.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const data = await getGoogleBooks(query, page);
    return Response.json(data);
  } catch (error) {
    const status =
      error instanceof GoogleBooksRequestError ? error.status : 500;

    return Response.json(
      { error: 'Failed to fetch books' },
      { status: status >= 400 ? status : 500 }
    );
  }
};
