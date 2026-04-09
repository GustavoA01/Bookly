import { render, screen } from '@testing-library/react';
import { BottomNavigation } from '../BottomNavigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/explorar'),
}));

describe('BottomNavigation', () => {
  it('renders component with correct props', () => {
    render(<BottomNavigation />);

    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Explorar')).toBeInTheDocument();
    expect(screen.getByText('Bookly IA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Explorar' })).toHaveAttribute('href', '/explorar');
    expect(screen.getByRole('link', { name: 'Bookly IA' })).toHaveAttribute('href', '/bookly-ia');
  });

  it('highlights the active navigation item based on the current pathname', () => {
    render(<BottomNavigation />);

    const activeItem = screen.getByText('Explorar').parentElement;
    expect(activeItem).toHaveClass('text-primary');
  });
});
