import { TableHead, TableRow } from "../../../components/ui/table"

export const BookTHeader = () => (
  <TableRow className=" mt-4 px-8">
    <TableHead className="text-muted-foreground font-bold">
      <p className="ml-8">Livro</p>
    </TableHead>
    <TableHead className="text-muted-foreground font-bold">Gênero</TableHead>
    <TableHead className="text-muted-foreground font-bold">Status</TableHead>

    <TableHead className="text-muted-foreground font-bold">Nota</TableHead>
  </TableRow>
)
