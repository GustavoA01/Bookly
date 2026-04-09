import { render, screen } from '@testing-library/react';
import { BookHeader } from '../components/BookHeader';

describe('BookHeader', () => {
  it('renders component with given props', () => {
    render(<BookHeader title="A Torre Negra" author="Stephen King" status="reading" isImageNull rating={90} />);

    expect(screen.getByText('A Torre Negra')).toBeInTheDocument();
    expect(screen.getByText('Stephen King')).toBeInTheDocument();
    expect(screen.getByText('Lendo')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
  });
});
