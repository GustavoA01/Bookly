import { render, screen } from '@testing-library/react';
import { BookRow } from '../components/BookRow';
import { Table, TableBody } from '@/src/components/ui/table';
import { Timestamp } from 'firebase/firestore';

const pushMockFn = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMockFn,
  }),
}));

const mockCreatedAt = {
  toDate: () => new Date('2024-01-01T12:00:00Z'),
} as Timestamp;

describe('BookRow', () => {
  beforeEach(() => {
    render(
      <Table>
        <TableBody>
          <BookRow
            id="testId"
            title="O Senhor dos Anéis"
            author="J.R.R. Tolkien"
            createdAt={mockCreatedAt}
            genre="Fantasia"
            status="read"
            rating={5}
          />
        </TableBody>
      </Table>
    );
  });

  it('renders component with correct props', () => {
    expect(screen.getByText('O Senhor dos Anéis')).toBeInTheDocument();
    expect(screen.getByText('J.R.R. Tolkien')).toBeInTheDocument();
    expect(screen.getByText('01/01/2024')).toBeInTheDocument();
    expect(screen.getByText('Fantasia')).toBeInTheDocument();
    expect(screen.getByText('Lido')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls router.push on row click', () => {
    const row = screen.getByTestId('book-row');
    row.click();

    expect(pushMockFn).toHaveBeenCalledWith('/livro/testId');
  });
});
