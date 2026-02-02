"use client";
import { Badge } from "../../../components/ui/badge";
import { TableCell, TableRow } from "../../../components/ui/table";
import { useRouter } from "next/navigation";

type BookRowProps = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  genre: string;
  status: string;
  rating: number;
};

export const BookRow = ({
  id,
  title,
  author,
  createdAt,
  genre,
  status,
  rating,
}: BookRowProps) => {
  const router = useRouter();
  return (
    <TableRow
      data-testid="book-row"
      onClick={() => router.push(`/livro/${id}`)}
      className="cursor-pointer group"
    >
      <TableCell className="flex flex-col max-w-md">
        <div className="flex flex-col ml-8">
          <h2 className="group-hover:text-primary transition duration-200 font-bold sm:text-lg whitespace-nowrap">
            {title}
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
            {author}
          </p>
          <p className="hidden sm:block text-muted-foreground text-xs">
            {createdAt}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge>{genre}</Badge>
      </TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{rating}</TableCell>
    </TableRow>
  );
};
