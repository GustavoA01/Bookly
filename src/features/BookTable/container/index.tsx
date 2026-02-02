import { Table, TableBody, TableHeader } from "../../../components/ui/table";
import { BookRow } from "../components/BookRow";
import { BookTHeader } from "../components/BookTHeader";

export const BookTable = () => {
  return (
    <Table className="mt-2 bg-card rounded-lg">
      <TableHeader>
        <BookTHeader />
      </TableHeader>

      <TableBody>
        <BookRow
          id="1"
          title="O Senhor dos Anéis"
          author="J.R.R. Tolkien"
          createdAt="21/01/2026"
          genre="Fantasia"
          status="Lido"
          rating={5}
        />
      </TableBody>
    </Table>
  );
};
