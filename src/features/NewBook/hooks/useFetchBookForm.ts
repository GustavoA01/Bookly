import { BookFormType } from '@/src/data/schemas';
import { FormSearchParamsType, GoogleBookItem } from '@/src/data/types/api';
import { Status } from '@/src/data/types/books';
import { getBookById } from '@/src/services/firebase/books/getBookById';
import { keys } from '@/src/services/keys';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';

type UseFetchBookFormType = {
  params: FormSearchParamsType;
  reset: UseFormReset<BookFormType>;
  setChoosedFile: (url: string | undefined) => void;
  setStatus: (status: Status) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
};

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

  const fetchBook = useCallback(async () => {
    const book = (await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    ).then((res) => res.json())) as GoogleBookItem;

    if (book) {
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
    }
  }, [id, reset, setChoosedFile]);

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
