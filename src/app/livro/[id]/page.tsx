"use client";
import { BookActions } from "@/src/features/BookDetailsPage/components/BookActions";
import { BookDetails } from "@/src/features/BookDetailsPage/container/BookDetails";
import { getBookById } from "@/src/services/firebase/books/getBookById";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

const BookDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const mockImage = "/detalhes-mock.jpg";

  const { data: book } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
    enabled: !!id,
  });

  return (
    <div className="space-y-8">
      {book && (
        <>
          <BookActions />
          <BookDetails
            id={book.id || "1"}
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
