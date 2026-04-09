import { fireEvent, render, screen } from '@testing-library/react';
import { BackButton } from '../BackButton';

const backFn = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: backFn,
  }),
}));

describe('BackButton', () => {
  it('renders the back button with correctly', () => {
    render(<BackButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(backFn).toHaveBeenCalled();
  });
});
