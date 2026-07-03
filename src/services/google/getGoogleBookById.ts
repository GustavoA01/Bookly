import { GoogleBookItem } from '../../data/types/api';
import { buildGoogleBooksUrl } from './googleBooksConfig';

export const getGoogleBookById = async (
  id: string
): Promise<GoogleBookItem | null> => {
  try {
    const res = await fetch(buildGoogleBooksUrl(`/${id}`), {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const book = (await res.json()) as GoogleBookItem;
    return book?.volumeInfo ? book : null;
  } catch {
    return null;
  }
};
