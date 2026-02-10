import { Suspense } from "react";
import { SearchCardSkeleton } from "./Skeletons";
import { SearchBookCard } from "./SearchBookCard";
import { GoogleBooksResponse } from "../data/types/api";

export const BookCardsList = ({ books }: { books: GoogleBooksResponse }) => (
  <>
    {books.items?.map((book) => (
      <SearchBookCard
        key={book.id}
        id={book.id}
        title={book.volumeInfo.title}
        author={
          book.volumeInfo.authors
            ? book.volumeInfo.authors.join(", ")
            : "Desconhecido"
        }
        imageUrl={book.volumeInfo.imageLinks?.thumbnail || "/detalhes-mock.jpg"}
        rating={book.volumeInfo.averageRating || null}
        genre={
          book.volumeInfo.categories ? book.volumeInfo.categories[0] : null
        }
      />
    ))}
  </>
);
