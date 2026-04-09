'use client';
import { Badge } from '../../../components/ui/badge';
import { TableCell, TableRow } from '../../../components/ui/table';
import { useRouter } from 'next/navigation';
import { BookType } from '@/src/data/types/books';
import { StatusChip } from '@/src/components/StatusChip';
import { format } from 'date-fns';

type BookRowProps = Pick<BookType, 'id' | 'title' | 'author' | 'createdAt' | 'genre' | 'status' | 'rating'>;

export const BookRow = ({ id, title, author, createdAt, genre, status, rating }: BookRowProps) => {
  const router = useRouter();

  return (
    <TableRow data-testid="book-row" onClick={() => router.push(`/livro/${id}`)} className="cursor-pointer group">
      <TableCell className="flex flex-col max-w-md">
        <div className="flex flex-col ml-8">
          <h2 className="line-clamp-1 max-w-85 truncate group-hover:text-primary transition duration-200 font-bold sm:text-lg whitespace-nowrap">
            {title}
          </h2>
          <p className="line-clamp-1 text-muted-foreground text-xs sm:text-sm whitespace-nowrap">{author}</p>
          <p className="hidden sm:block text-muted-foreground text-xs">{format(createdAt.toDate(), 'dd/MM/yyyy')}</p>
        </div>
      </TableCell>
      <TableCell>
        {genre ? (
          <Badge variant="outline" className="text-muted-foreground line-clamp-1">
            {genre}
          </Badge>
        ) : (
          <p>-</p>
        )}
      </TableCell>
      <TableCell>
        <StatusChip status={status} />
      </TableCell>

      {rating ? <TableCell>{rating}</TableCell> : <TableCell>-</TableCell>}
    </TableRow>
  );
};
