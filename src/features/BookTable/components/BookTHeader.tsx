import { TableHead, TableRow } from '../../../components/ui/table';

const tableHeaderClassName = 'text-muted-foreground font-bold';

export const BookTHeader = () => (
  <TableRow>
    <TableHead className={tableHeaderClassName}>
      <p className="ml-8">Livro</p>
    </TableHead>
    <TableHead className={tableHeaderClassName}>Gênero</TableHead>
    <TableHead className={tableHeaderClassName}>Status</TableHead>
    <TableHead className={tableHeaderClassName}>
      <p className="max-sm:mr-8">Nota</p>
    </TableHead>
  </TableRow>
);
