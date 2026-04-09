import { BookCardsList } from '@/src/components/BookCardsList';
import { SearchForm } from '@/src/components/SearchForm';
import { SearchCardSkeleton } from '@/src/components/Skeletons';
import { Suspense } from 'react';

const ExplorePage = async ({ searchParams }: { searchParams: Promise<{ q: string; page: string }> }) => {
  const params = await searchParams;
  const query = params.q;
  const currentPage = Number(params.page) || 1;

  return (
    <div className="space-y-4">
      <SearchForm />

      <Suspense
        key={`${query}-${currentPage}`}
        fallback={
          <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <SearchCardSkeleton key={`${query}-${index}`} />
            ))}
          </div>
        }
      >
        <BookCardsList currentPage={currentPage} query={query || 'intitle:a'} />
      </Suspense>
    </div>
  );
};

export default ExplorePage;
