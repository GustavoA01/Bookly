import { render, screen } from '@testing-library/react';
import { PagesForm } from '../components/PagesForm';

jest.mock('react-hook-form', () => ({
  useFormContext: () => ({
    register: jest.fn(),
  }),
}));

describe('PagesForm', () => {
  it('renders component correctly', () => {
    render(<PagesForm register={jest.fn()} />);
    const currentPageInput = screen.getAllByRole('spinbutton')[1];

    expect(screen.getByText('Número de páginas')).toBeInTheDocument();
    expect(screen.getByText('Página atual')).toBeInTheDocument();
    expect(currentPageInput).toHaveAttribute('type', 'number');
  });
});
