import {
  GoogleBookItem,
  OpenLibraryAuthorType,
  OpenLibraryEditionsResponseType,
  OpenLibraryEditionType,
  OpenLibraryWorkType,
} from '../../data/types/api';

const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org';

const getDescription = (description: OpenLibraryWorkType['description']) => {
  if (!description) return undefined;
  return typeof description === 'string' ? description : description.value;
};

const getWorkId = (id: string) => id.replace('openlibrary-', '');

const languageMap: Record<string, string> = {
  eng: 'en',
  por: 'pt',
  spa: 'es',
  fre: 'fr',
  ger: 'de',
};

const getLanguage = (edition?: OpenLibraryEditionType) => {
  const language = edition?.languages?.[0]?.key?.split('/').pop();
  return language ? languageMap[language] || language : 'pt';
};

const getCoverLinks = (coverId?: number) =>
  coverId
    ? {
        smallThumbnail: `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`,
        thumbnail: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
      }
    : undefined;

const fetchOpenLibraryJson = async <T>(path: string): Promise<T | null> => {
  try {
    const res = await fetch(`${OPEN_LIBRARY_BASE_URL}${path}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    return (await res.json()) as T;
  } catch {
    return null;
  }
};

const resolveWork = async (workId: string) => {
  const work = await fetchOpenLibraryJson<OpenLibraryWorkType>(
    `/works/${workId}.json`
  );

  if (!work?.location) return work;

  return fetchOpenLibraryJson<OpenLibraryWorkType>(`${work.location}.json`);
};

const getAuthorNames = async (work: OpenLibraryWorkType) => {
  const authorKeys =
    work.authors
      ?.map((authorRef) => authorRef.author?.key)
      .filter((key): key is string => Boolean(key)) || [];

  const authors = await Promise.all(
    authorKeys.map((key) =>
      fetchOpenLibraryJson<OpenLibraryAuthorType>(`${key}.json`)
    )
  );

  return authors
    .map(
      (author) => author?.name || author?.personal_name || author?.fuller_name
    )
    .filter((name): name is string => Boolean(name));
};

const getEditionScore = (
  edition: OpenLibraryEditionType,
  workTitle?: string
) => {
  const titleMatchesWork = edition.title === workTitle ? 4 : 0;
  const language = edition.languages?.[0]?.key?.split('/').pop();
  const preferredLanguage = language === 'eng' || language === 'por' ? 3 : 0;
  const hasPublisher = edition.publishers?.length ? 1 : 0;
  const hasPages = edition.number_of_pages ? 1 : 0;

  return titleMatchesWork + preferredLanguage + hasPublisher + hasPages;
};

const getBestEdition = async (workKey: string, workTitle?: string) => {
  const editions = await fetchOpenLibraryJson<OpenLibraryEditionsResponseType>(
    `${workKey}/editions.json?limit=20`
  );
  const entries = editions?.entries || [];

  return entries.sort(
    (first, second) =>
      getEditionScore(second, workTitle) - getEditionScore(first, workTitle)
  )[0];
};

export const getOpenLibraryBookById = async (
  id: string
): Promise<GoogleBookItem | null> => {
  if (!id.startsWith('openlibrary-')) return null;

  const work = await resolveWork(getWorkId(id));
  if (!work?.key) return null;

  const [authors, edition] = await Promise.all([
    getAuthorNames(work),
    getBestEdition(work.key, work.title),
  ]);
  const coverId = work.covers?.[0] || edition?.covers?.[0];

  return {
    id,
    volumeInfo: {
      title: work.title || 'Titulo Indisponivel',
      authors: authors.length ? authors : undefined,
      publisher: edition?.publishers?.[0],
      publishedDate: work.first_publish_date || edition?.publish_date,
      description: getDescription(work.description),
      pageCount: edition?.number_of_pages,
      categories: work.subjects?.slice(0, 1),
      imageLinks: getCoverLinks(coverId),
      language: getLanguage(edition),
      previewLink: `${OPEN_LIBRARY_BASE_URL}${work.key}`,
    },
  };
};
