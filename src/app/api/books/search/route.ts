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
    const message =
      error instanceof Error ? error.message : 'Failed to fetch books';

    console.error('[books/search]', message, { status, query, page });

    // Normaliza erros transitórios da Google para 502 — o client mantém a lista anterior
    const responseStatus = status === 503 || status === 429 ? 502 : status;

    return Response.json(
      { error: 'Failed to fetch books' },
      { status: responseStatus >= 400 ? responseStatus : 500 }
    );
  }
};
