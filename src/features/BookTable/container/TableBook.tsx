import { Table, TableBody, TableHeader } from "../../../components/ui/table"
import { BookRow } from "../components/BookRow"
import { BookTHeader } from "../components/BookTHeader"

export const TableBook = () => {
  return (
    <Table className="mt-2 bg-card rounded-lg">
      <TableHeader>
        <BookTHeader />
      </TableHeader>

      <TableBody>
        <BookRow />
      </TableBody>
    </Table>
  )
}
