import { Skeleton } from "../ui/skeleton";

export const SearchCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <div className="relative w-full aspect-2/3">
      <Skeleton className="h-full w-full rounded-md" />
    </div>

    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />

      <div className="hidden sm:flex items-center gap-2 mt-1">
        <Skeleton className="h-4 w-8 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>
    </div>
  </div>
);
