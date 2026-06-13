import { GoogleBookItem } from '@/src/data/types/api';
import { getBookById } from '@/src/services/firebase/books/getBookById';
import { getOpenLibraryBookById } from '@/src/services/openLibrary/getOpenLibraryBookById';
import { keys } from '@/src/services/keys';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { UseFetchBookFormType } from '../types';

export const useFetchBookForm = ({
  params,
  reset,
  setChoosedFile,
  setStatus,
  setStartDate,
  setEndDate,
}: UseFetchBookFormType) => {
  const { id, role } = params;
  const isLibrary = !!id && role === 'library';
  const isGoogle = !!id && role === 'google';

  const htmlToText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const { data: libraryBook } = useQuery({
    queryKey: [keys.queryKeys.bookId, id],
    queryFn: () => getBookById(id),
    enabled: isLibrary,
  });

  const fillGoogleBookData = useCallback(
    (book: GoogleBookItem) => {
      reset({
        title: book.volumeInfo.title || '',
        author: book.volumeInfo.authors
          ? book.volumeInfo.authors.join(', ')
          : '',
        imageUrl: book.volumeInfo.imageLinks?.thumbnail || '',
        numberOfPages: book.volumeInfo.pageCount || undefined,
        synopsis: htmlToText(book.volumeInfo.description || ''),
        genre: book.volumeInfo.categories ? book.volumeInfo.categories[0] : '',
      });
      setChoosedFile(book.volumeInfo.imageLinks?.thumbnail || undefined);
    },
    [reset, setChoosedFile]
  );

  const fetchBook = useCallback(async () => {
    const openLibraryBook = await getOpenLibraryBookById(id || '');

    if (openLibraryBook) {
      fillGoogleBookData(openLibraryBook);
      return;
    }

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );

      if (!res.ok) return;

      const book = (await res.json()) as GoogleBookItem;

      if (book?.volumeInfo) fillGoogleBookData(book);
    } catch {
      return;
    }
  }, [id, fillGoogleBookData]);

  const insertUserBookData = useCallback(() => {
    if (libraryBook) {
      reset({
        title: libraryBook.title,
        author: libraryBook.author || '',
        genre: libraryBook.genre || '',
        imageUrl: libraryBook.imageUrl || '',
        synopsis: libraryBook.synopsis || '',
        numberOfPages: libraryBook.totalPages || undefined,
        currentPage: libraryBook.currentPage || undefined,
        rating: libraryBook.rating || undefined,
      });
      setChoosedFile(libraryBook.imageUrl || undefined);
      setStatus(libraryBook.status);
      setStartDate(
        libraryBook.startDate ? libraryBook.startDate.toDate() : undefined
      );
      setEndDate(
        libraryBook.endDate ? libraryBook.endDate.toDate() : undefined
      );
    }
  }, [setStatus, setStartDate, setEndDate, setChoosedFile, reset, libraryBook]);

  useEffect(() => {
    if (isGoogle) fetchBook();
    else if (isLibrary) insertUserBookData();
  }, [fetchBook, isGoogle, isLibrary, insertUserBookData]);
};
