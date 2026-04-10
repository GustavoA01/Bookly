import { Table, TableBody, TableHeader } from '../../../components/ui/table';
import { BookRow } from '../components/BookRow';
import { BookTHeader } from '../components/BookTHeader';
import { BookTableSkeleton } from '@/src/components/Skeletons';
import { BookType } from '@/src/data/types/books';

type BookTableProps = {
  books: BookType[] | undefined;
  isBooksLoading: boolean;
  isUserLoading?: boolean;
};

export const BookTable = ({
  books,
  isBooksLoading,
  isUserLoading,
}: BookTableProps) => (
  <div className="mt-2 max-h-130 sm:max-h-160 overflow-y-auto hide-scrollbar rounded-md border">
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
