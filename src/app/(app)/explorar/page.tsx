import { SearchCardSkeleton } from '@/src/components/Skeletons';
import { ExploreContent } from '@/src/features/ExplorePage/container/ExploreContent';
import { Suspense } from 'react';

const ExploreFallback = () => (
  <div className="space-y-4">
    <div className="h-11 w-full sm:max-w-80 rounded-md bg-muted" />
    <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <SearchCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

const ExplorePage = () => (
  <Suspense fallback={<ExploreFallback />}>
    <ExploreContent />
  </Suspense>
);

export default ExplorePage;
