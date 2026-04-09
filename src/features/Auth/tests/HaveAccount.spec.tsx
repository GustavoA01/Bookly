import { render } from '@testing-library/react';
import { HaveAccount } from '../components/HaveAccount';

describe('HaveAccount', () => {
  it('renders the component with correct props', () => {
    const props = {
      labelHref: '/login',
      labelAction: 'Entrar',
      label: 'Já possui uma conta?',
    };
    const { getByText } = render(<HaveAccount {...props} />);

    expect(getByText('Já possui uma conta?')).toBeInTheDocument();
    expect(getByText('Entrar')).toBeInTheDocument();
    expect(getByText(props.labelAction).closest('a')).toHaveAttribute('href', '/login');
  });
});
