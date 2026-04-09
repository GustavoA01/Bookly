import { SearchCardSkeleton } from '@/src/components/Skeletons';
import { Skeleton } from '@/src/components/ui/skeleton';

const ExploreLoading = () => {
  return (
    <div className="space-y-4 w-full animate-pulse">
      <div className="w-full sm:max-w-80">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <SearchCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default ExploreLoading;
