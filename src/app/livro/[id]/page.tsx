'use client';
import { BookActions } from '@/src/features/BookDetailsPage/container/BookActions';
import { BookDetails } from '@/src/features/BookDetailsPage/container/BookDetails';
import { getBookById } from '@/src/services/firebase/books/getBookById';
import { keys } from '@/src/services/keys';
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import BookDetailsSkeleton from './loading';
import BookDetailsError from './error';

const BookDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const {
    data: book,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [keys.queryKeys.bookId, id],
    queryFn: () => getBookById(id),
    enabled: !!id,
  });

  if (isLoading) return <BookDetailsSkeleton />;

  if (isError) return <BookDetailsError error={error} />;

  return (
    <div className="space-y-8">
      {book && (
        <>
          <BookActions />
          <BookDetails
            id={book.id}
            title={book.title}
            author={book.author}
            rating={book.rating}
            status={book.status}
            synopsis={book.synopsis}
            comment={book.comment}
            imageUrl={book.imageUrl}
            genre={book.genre}
            currentPage={book.currentPage}
            totalPages={book.totalPages}
            startDate={book.startDate}
            endDate={book.endDate}
          />
        </>
      )}
    </div>
  );
};

export default BookDetailsPage;
