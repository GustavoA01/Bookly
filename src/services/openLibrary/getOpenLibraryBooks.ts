import {
  GoogleBookItem,
  GoogleBooksResponse,
  OpenLibraryDocType,
  OpenLibraryResponseType,
} from '../../data/types/api';

const OPEN_LIBRARY_ENDPOINT = 'https://openlibrary.org/search.json';
const PAGE_SIZE = 12;

const emptyOpenLibraryResponse: GoogleBooksResponse = {
  kind: 'books#volumes',
  totalItems: 0,
  items: [],
};

const mapOpenLibraryBook = (doc: OpenLibraryDocType): GoogleBookItem | null => {
  const workId = doc.key?.split('/').pop();
  if (!workId || !doc.title) return null;

  const firstSentence = Array.isArray(doc.first_sentence)
    ? doc.first_sentence[0]
    : doc.first_sentence;

  return {
    id: `openlibrary-${workId}`,
    volumeInfo: {
      title: doc.title,
      authors: doc.author_name,
      publishedDate: doc.first_publish_year
        ? String(doc.first_publish_year)
        : undefined,
      description: firstSentence,
      pageCount: doc.number_of_pages_median,
      categories: doc.subject?.slice(0, 1),
      averageRating: doc.ratings_average
        ? Number(doc.ratings_average.toFixed(1))
        : undefined,
      imageLinks: doc.cover_i
        ? {
            smallThumbnail: `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`,
            thumbnail: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
          }
        : undefined,
      language: doc.language?.[0] || 'pt',
      previewLink: `https://openlibrary.org/works/${workId}`,
    },
  };
};

export const getOpenLibraryBooks = async (
  query: string,
  startIndex: number
): Promise<GoogleBooksResponse> => {
  const normalizedQuery = query.trim();
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    offset: String(startIndex),
  });

  if (normalizedQuery.length < 3) params.set('title', normalizedQuery);
  else params.set('q', normalizedQuery);

  const res = await fetch(`${OPEN_LIBRARY_ENDPOINT}?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) return emptyOpenLibraryResponse;

  const data = (await res.json()) as OpenLibraryResponseType;
  const items = (data.docs || [])
    .map(mapOpenLibraryBook)
    .filter((book): book is GoogleBookItem => Boolean(book));

  return {
    kind: 'books#volumes',
    totalItems: data.numFound || items.length,
    items,
  };
};
