import { getGoogleBookById } from '@/src/services/google/getGoogleBookById';
import { getOpenLibraryBookById } from '@/src/services/openLibrary/getOpenLibraryBookById';

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const book =
    (await getOpenLibraryBookById(id)) || (await getGoogleBookById(id));

  if (!book) {
    return Response.json({ error: 'Livro não encontrado' }, { status: 404 });
  }

  return Response.json(book);
};
