'use client';
import { SearchBookCard } from '@/src/components/SearchBookCard';
import { BookPagination } from '@/src/features/ExplorePage/container/BookPagination';
import { SearchCardSkeleton } from '@/src/components/Skeletons';
import { Input } from '@/src/components/ui/input';
import { GOOGLE_BOOKS_PAGE_SIZE } from '@/src/services/google/googleBooksConfig';
import { useExploreContent } from '../hooks/useExploreContent';

const MAX_PAGES = 6;

export const ExploreContent = () => {
  const {
    books,
    currentPage,
    isFetching,
    query,
    handlePageChange,
    searchText,
    setSearchText,
    totalItems,
  } = useExploreContent();

  return (
    <div className="space-y-4">
      <form className="flex items-center gap-2">
        <Input
          value={searchText}
          placeholder="Buscar"
          className="w-full sm:max-w-80"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </form>

      {isFetching ? (
        <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: GOOGLE_BOOKS_PAGE_SIZE }).map((_, index) => (
            <SearchCardSkeleton key={`${query}-${currentPage}-${index}`} />
          ))}
        </div>
      ) : (
        <div className="max-sm:mb-15">
          <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {books.map((book) => (
              <SearchBookCard
                key={book.id}
                id={book.id}
                title={book.volumeInfo.title}
                author={
                  book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(', ')
                    : 'Desconhecido'
                }
                imageUrl={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  '/img-placeholder.jpg'
                }
                rating={book.volumeInfo.averageRating || null}
                genre={
                  book.volumeInfo.categories
                    ? book.volumeInfo.categories[0]
                    : null
                }
              />
            ))}
          </div>

          {totalItems > 0 && (
            <BookPagination
              currentPage={currentPage}
              numberOfPages={Math.min(
                MAX_PAGES,
                Math.max(1, Math.ceil(totalItems / GOOGLE_BOOKS_PAGE_SIZE))
              )}
              onPageChange={handlePageChange}
            />
          )}

          {query && totalItems === 0 && (
            <p className="text-center text-gray-500 mt-8">
              Nenhum livro encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
