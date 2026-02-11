import { BookCardsList } from "@/src/components/BookCardsList";
import { SearchForm } from "@/src/components/SearchForm";
import { SearchCardSkeleton } from "@/src/components/Skeletons";
import { GoogleBooksResponse } from "@/src/data/types/api";
import { api } from "@/src/lib/axios";
import { Suspense } from "react";

const ExplorePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  let books = (await api
    .get("?q=intitle:a&maxResults=12")
    .then((res) => res.data)) as GoogleBooksResponse;

  const query = await searchParams.then((params) => params.q);

  if (query) {
    const searchedBooks = (await api
      .get(`?q=${query}&maxResults=12`)
      .then((res) => res.data)) as GoogleBooksResponse;

    books = searchedBooks.items?.length ? searchedBooks : books;
  }

  return (
    <div className="space-y-4">
      <SearchForm />

      <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <Suspense
          fallback={Array.from({ length: 12 }).map((_, index) => (
            <SearchCardSkeleton key={`${query}-${index}`} />
          ))}
        >
          <BookCardsList books={books} />
        </Suspense>
      </div>
    </div>
  );
};

export default ExplorePage;
