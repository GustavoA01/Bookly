import { render, screen } from '@testing-library/react';
import { DescriptionForm } from '../components/NewListForm/DescriptionForm';

jest.mock('react-hook-form', () => ({
  useFormContext: () => ({
    register: jest.fn(),
  }),
}));

describe('DescriptionForm', () => {
  it('renders component correctly', () => {
    render(<DescriptionForm register={jest.fn()} />);

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex: Fantasia')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Melhores livros...')).toBeInTheDocument();
  });
});
