import { BookTableSkeleton } from '@/src/components/Skeletons';
import { Skeleton } from '@/src/components/ui/skeleton';

const ListDetailsLoading = () => (
  <div className="animate-pulse">
    <header className="flex justify-between items-center mb-8">
      <div className="w-12 h-12 rounded-full bg-muted" />

      <div className="flex space-x-4">
        <div className="w-12 h-12 rounded-full bg-muted" />
        <div className="w-12 h-12 rounded-full bg-muted" />
      </div>
    </header>

    <main className="space-y-4">
      <div className="flex flex-col max-sm:space-y-4 sm:flex-row justify-center sm:items-center sm:space-x-4">
        <div>
          <Skeleton className="w-50 h-50 rounded-md m-auto" />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="mt-2 max-h-130 sm:max-h-160 overflow-y-auto hide-scrollbar rounded-md border">
        <div className="bg-card rounded-lg">
          <div className="bg-background border-b">
            <div className="flex gap-4 p-4">
              <Skeleton className="h-4 w-8 col-span-1" />
              <Skeleton className="h-4 w-32 col-span-2" />
              <Skeleton className="h-4 w-24 col-span-2" />
              <Skeleton className="h-4 w-20 col-span-2" />
            </div>
          </div>

          <BookTableSkeleton />
        </div>
      </div>
    </main>
  </div>
);

export default ListDetailsLoading;
