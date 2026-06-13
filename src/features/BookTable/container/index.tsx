import { Table, TableBody, TableHeader } from '../../../components/ui/table';
import { BookRow } from '../components/BookRow';
import { BookTHeader } from '../components/BookTHeader';
import { BookTableSkeleton } from '@/src/components/Skeletons';
import { cn } from '@/src/lib/utils';
import { BookTableProps } from '../types';

export const BookTable = ({
  books,
  isBooksLoading,
  isUserLoading,
  fillAvailable = false,
}: BookTableProps) => (
  <div
    className={cn(
      'mt-2 overflow-y-auto hide-scrollbar rounded-md border',
      fillAvailable
        ? 'min-h-0 flex-1 mb-6 max-sm:mb-20'
        : 'max-h-130 sm:max-h-160'
    )}
  >
    <Table className="bg-card rounded-lg">
      <TableHeader className="bg-background">
        <BookTHeader />
      </TableHeader>

      <TableBody>
        {isBooksLoading || isUserLoading ? (
          <BookTableSkeleton />
        ) : !books || books.length === 0 ? (
          <tr>
            <td colSpan={6}>
              <p className="text-center text-muted-foreground my-4">
                Nenhum livro encontrado
              </p>
            </td>
          </tr>
        ) : (
          books.map((book) => (
            <BookRow
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
              createdAt={book.createdAt}
              status={book.status}
              rating={book.rating}
            />
          ))
        )}
      </TableBody>
    </Table>
  </div>
);
