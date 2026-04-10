import { SearchBookCard } from './SearchBookCard';
import { getGoogleBooks } from '../services/google/getGoogleBooks';
import { SharedPagination } from './SharedPagination';

type BookCardsListProps = {
  query: string;
  currentPage: number;
};

export const BookCardsList = async ({
  query,
  currentPage,
}: BookCardsListProps) => {
  const searchedBooks = await getGoogleBooks(query, currentPage);

  return (
    <div>
      <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {searchedBooks?.items?.map((book) => (
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
              book.volumeInfo.imageLinks?.thumbnail || '/img-placeholder.jpg'
            }
            rating={book.volumeInfo.averageRating || null}
            genre={
              book.volumeInfo.categories ? book.volumeInfo.categories[0] : null
            }
          />
        ))}
      </div>

      {searchedBooks?.totalItems && <SharedPagination />}

      {searchedBooks?.totalItems === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Nenhum livro encontrado.
        </p>
      )}
    </div>
  );
};
