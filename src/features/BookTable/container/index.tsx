"use client";
import { Table, TableBody, TableHeader } from "../../../components/ui/table";
import { BookRow } from "../components/BookRow";
import { BookTHeader } from "../components/BookTHeader";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/src/services/firebase/books/getBooks";
import { keys } from "@/src/services/keys";
import { BookTableSkeleton } from "@/src/components/Skeletons";

export const BookTable = () => {
  const { data: books, isLoading } = useQuery({
    queryKey: [keys.queryKeys.books],
    queryFn: getBooks,
  });

  return (
    <Table className="mt-2 bg-card rounded-lg">
      <TableHeader>
        <BookTHeader />
      </TableHeader>

      <TableBody>
        {isLoading ? (
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
  );
};
