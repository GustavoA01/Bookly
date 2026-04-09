import { render, screen } from '@testing-library/react';
import { EmailPass } from '../components/EmailPass';

describe('EmailPass', () => {
  const defaultProps = {
    actionLabel: 'Sign In',
    register: jest.fn(),
    isPending: false,
  };

  it('renders email and password inputs correctly', () => {
    render(<EmailPass {...defaultProps} />);

    expect(screen.getByText('EMAIL')).toBeInTheDocument();
    expect(screen.getByText('SENHA')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('exemplo@bookly.com')).toBeInTheDocument();
  });

  it('displays the correct action label on the button', () => {
    render(<EmailPass {...defaultProps} />);

    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('renders password recovery link when pathPasswordRecovery is provided', () => {
    const recoveryProps = {
      ...defaultProps,
      pathPasswordRecovery: '/password-recovery',
      labelPasswordRecovery: 'Esqueceu a senha?',
      labelAction: 'Recuperar',
    };

    render(<EmailPass {...recoveryProps} />);

    expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Recuperar' })).toHaveAttribute('href', '/password-recovery');
  });

  it('does not render recovery section when pathPasswordRecovery is missing', () => {
    render(<EmailPass {...defaultProps} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders spinner if isPending is true', () => {
    render(<EmailPass {...defaultProps} isPending={true} />);

    expect(screen.getByTestId('auth-spinner')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeDisabled();
  });
});
