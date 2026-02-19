import { SearchBookCard } from "./SearchBookCard";
import { GoogleBooksResponse } from "../data/types/api";
import { GooglePagination } from "./GooglePagination";

export const BookCardsList = async ({ query }: { query: string }) => {
  const searchedBooks = (await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`,
    {
      next: { revalidate: 60 * 60 },
    },
  ).then((res) => res.json())) as GoogleBooksResponse;

  return (
    <div>
      <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
              book.volumeInfo.imageLinks?.thumbnail || "/detalhes-mock.jpg" //TODO:trocar para imagem placeholder
            }
            rating={book.volumeInfo.averageRating || null}
            genre={
              book.volumeInfo.categories ? book.volumeInfo.categories[0] : null
            }
          />
        ))}
      </div>

      <GooglePagination />
    </div>
  );
};
