import { render, screen } from '@testing-library/react';
import { BookTHeader } from '../components/BookTHeader';
import { Table, TableHeader } from '@/src/components/ui/table';

describe('BookTHeader', () => {
  it('renders component correctly', () => {
    render(
      <Table>
        <TableHeader>
          <BookTHeader />
        </TableHeader>
      </Table>
    );

    expect(screen.getByText('Livro')).toBeInTheDocument();
    expect(screen.getByText('Gênero')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Nota')).toBeInTheDocument();
  });
});
