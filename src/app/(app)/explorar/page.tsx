import { SearchBookCard } from "@/src/components/SearchBookCard";
import { SearchForm } from "@/src/components/SearchForm";
import { Skeleton } from "@/src/components/ui/skeleton";
import { GoogleBooksResponse } from "@/src/data/types/api";
import { Suspense } from "react";

const ExplorePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  let books = (await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=intitle:a&maxResults=12",
  ).then((res) => res.json())) as GoogleBooksResponse;

  const query = await searchParams.then((params) => params.q);

  if (query) {
    const searchedBooks = (await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`,
    ).then((res) => res.json())) as GoogleBooksResponse;

    books = searchedBooks.items?.length ? searchedBooks : books;
  }

  return (
    <div className="space-y-4">
      <SearchForm />

      <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <Suspense
          fallback={Array.from({ length: 12 }).map((_, index) => (
            <Skeleton className="h-64 w-full rounded-md" key={index} />
          ))}
        >
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
              imageUrl={
                book.volumeInfo.imageLinks?.thumbnail || "/detalhes-mock.jpg"
              }
              rating={book.volumeInfo.averageRating || null}
              genre={
                book.volumeInfo.categories
                  ? book.volumeInfo.categories[0]
                  : null
              }
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default ExplorePage;
