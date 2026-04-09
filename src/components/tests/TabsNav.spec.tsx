import { render, screen } from '@testing-library/react';
import { TabsNav } from '../TabsNav';

describe('TabsNav', () => {
  it('renders component correctly', () => {
    render(<TabsNav tab="books" />);

    expect(screen.getByText('Livros')).toBeInTheDocument();
    expect(screen.getByText('Listas')).toBeInTheDocument();
  });

  it('highlights the correct tab based on prop', () => {
    render(<TabsNav tab="books" />);

    expect(screen.getByRole('button', { name: 'Livros' })).toHaveClass('bg-secondary');
    expect(screen.getByRole('button', { name: 'Listas' })).not.toHaveClass('bg-secondary');
  });

  it('renders with default tab when no prop is provided', () => {
    render(<TabsNav tab={undefined} />);

    expect(screen.getByRole('button', { name: 'Livros' })).toHaveClass('bg-secondary');
    expect(screen.getByRole('button', { name: 'Listas' })).not.toHaveClass('bg-secondary');
  });

  it('redirects to correct URL on tab click', () => {
    render(<TabsNav tab="books" />);

    const booksTab = screen.getByRole('link', { name: 'Livros' });
    const listsTab = screen.getByRole('link', { name: 'Listas' });

    expect(booksTab).toHaveAttribute('href', '?tab=books');
    expect(listsTab).toHaveAttribute('href', '?tab=lists');
  });
});
