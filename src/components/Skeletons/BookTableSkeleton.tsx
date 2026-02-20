import { TableRow, TableCell } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export const BookTableSkeleton = () => (
  <>
    {Array.from({ length: 6 }).map((_, i) => (
      <TableRow key={i}>
        <TableCell className="flex flex-col max-w-md">
          <div className="flex flex-col ml-8 gap-2">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-2 w-20" />
          </div>
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-14" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-8" />
        </TableCell>
      </TableRow>
    ))}
  </>
);
