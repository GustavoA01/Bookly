import { fireEvent, render, screen } from '@testing-library/react';
import { Options } from '../components/Options';

const handleOpenUserDialog = jest.fn();
const handleOpenPasswordDialog = jest.fn();

describe('Options', () => {
  const renderComponent = () => {
    return render(
      <Options
        handleOpenUserDialog={handleOpenUserDialog}
        handleOpenPasswordDialog={handleOpenPasswordDialog}
      />
    );
  };

  it('renders the component with the correct buttons', () => {
    renderComponent();
    expect(screen.getByText('Alterar nome de usuário')).toBeInTheDocument();
    expect(screen.getByText('Alterar senha')).toBeInTheDocument();
  });

  it('calls the correct functions when buttons are clicked', () => {
    renderComponent();
    const userButton = screen.getByText('Alterar nome de usuário');
    const passwordButton = screen.getByText('Alterar senha');

    fireEvent.click(userButton);
    expect(handleOpenUserDialog).toHaveBeenCalled();
    fireEvent.click(passwordButton);
    expect(handleOpenPasswordDialog).toHaveBeenCalled();
  });
});
