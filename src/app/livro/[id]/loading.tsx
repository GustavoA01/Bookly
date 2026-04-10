'use client';
import { Skeleton } from '@/src/components/ui/skeleton';
import { Card, CardContent } from '@/src/components/ui/card';

const BookDetailsSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <Skeleton className="w-12 h-12 rounded-full" />

    <div className="flex flex-col justify-center">
      <div className="sm:hidden m-auto mb-4">
        <Skeleton className="w-62.5 h-87.5 rounded-md" />
      </div>

      <div className="flex sm:space-x-8 justify-center max-sm:flex-col max-sm:items-center max-sm:space-y-4">
        <div className="hidden sm:block">
          <Skeleton className="w-62.5 h-87.5 rounded-md" />
        </div>

        <div className="flex flex-col justify-between max-w-md w-full">
          <div className="space-y-3">
            <Skeleton className="h-8 w-80" />
            <Skeleton className="h-5 w-56" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-5 h-5 rounded-full" />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-8 sm:grid sm:grid-cols-3 sm:space-x-4">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Card className="bg-transparent border-border">
            <CardContent className="p-6">
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className={`h-4 ${i === 0 ? 'w-full' : `w-${11 - i}/12`}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 max-sm:mt-4 col-span-1">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-2 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BookDetailsSkeleton;
