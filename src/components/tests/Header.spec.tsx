import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

global.fetch = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/bookly-ia'),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(() => ({
    removeQueries: jest.fn(),
  })),
}));

describe('Header', () => {
  it('renders component correctly', () => {
    render(<Header />);

    expect(screen.getByText('Bookly')).toBeInTheDocument();
    expect(screen.getByText('Gerencie sua biblioteca pessoal')).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Explorar')).toBeInTheDocument();
    expect(screen.getByText('Bookly IA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Explorar' })).toHaveAttribute('href', '/explorar');
    expect(screen.getByRole('link', { name: 'Bookly IA' })).toHaveAttribute('href', '/bookly-ia');
  });

  it('highlights the active navigation item based on the current pathname', () => {
    render(<Header />);

    const activeItem = screen.getByText('Bookly IA');
    expect(activeItem).toHaveClass('bg-accent');
  });
});
