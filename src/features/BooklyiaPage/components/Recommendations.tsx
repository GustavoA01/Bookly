import { SearchBookCard } from '@/src/components/SearchBookCard';
import { SearchCardSkeleton } from '@/src/components/Skeletons';
import { GoogleBookItem } from '@/src/data/types/api';

type RecommendationsProps = {
  isChatPending: boolean;
  books: GoogleBookItem[];
};

export const Recommendations = ({ books, isChatPending }: RecommendationsProps) => (
  <div className="mt-8 flex gap-4 overflow-x-auto pb-4 hide-scrollbar sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-225 mx-auto">
    {isChatPending &&
      [...Array(5)].map((_, i) => (
        <div key={i} className="min-w-40 sm:min-w-0 sm:w-full">
          <SearchCardSkeleton />
        </div>
      ))}
    {books.map((book) => (
      <div key={book.id} className="min-w-40 sm:min-w-0 sm:w-full">
        <SearchBookCard
          id={book.id}
          title={book.volumeInfo.title || 'Desconhecido'}
          author={book.volumeInfo.authors?.[0] || 'Desconhecido'}
          imageUrl={book.volumeInfo.imageLinks?.thumbnail || '/img-placeholder.jpg'}
          genre={book.volumeInfo.categories?.[0] ?? null}
          rating={book.volumeInfo.averageRating ?? null}
        />
      </div>
    ))}
  </div>
);
