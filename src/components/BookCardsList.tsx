import { SearchBookCard } from "./SearchBookCard";
import { GoogleBooksResponse } from "../data/types/api";

export const BookCardsList = async ({ query }: { query: string }) => {
  const searchedBooks = (await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`,
    {
      next: { revalidate: 60 * 60 },
    },
  ).then((res) => res.json())) as GoogleBooksResponse;

  return (
    <>
      {searchedBooks.items?.map((book) => (
        <SearchBookCard
          key={book.id}
          id={book.id}
          title={book.volumeInfo.title}
          author={
            book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "Desconhecido"
          }
          imageUrl={
            book.volumeInfo.imageLinks?.thumbnail || "/detalhes-mock.jpg"
          }
          rating={book.volumeInfo.averageRating || null}
          genre={
            book.volumeInfo.categories ? book.volumeInfo.categories[0] : null
          }
        />
      ))}
    </>
  );
};
