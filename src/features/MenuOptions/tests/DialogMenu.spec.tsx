import { render, screen, fireEvent } from '@testing-library/react';
import { User } from 'firebase/auth';
import { DialogMenu } from '../components/DialogMenu';
import { Dialog } from '@/src/components/ui/dialog';

const mockHandleLogout = jest.fn();
const mockHandleOpenUserDialog = jest.fn();
const mockHandleOpenPasswordDialog = jest.fn();

const mockUser = {
  displayName: 'João Silva',
  email: 'joao@example.com',
} as User;

describe('DialogMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Dialog open>
        <DialogMenu
          user={mockUser}
          handleLogout={mockHandleLogout}
          handleOpenUserDialog={mockHandleOpenUserDialog}
          handleOpenPasswordDialog={mockHandleOpenPasswordDialog}
        />
      </Dialog>
    );

  it('should render the dialog with user name and email', () => {
    renderComponent();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
  });

  it('should render the Options component', () => {
    renderComponent();

    expect(
      screen.getAllByText('Alterar nome de usuário')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('Alterar senha')[0]).toBeInTheDocument();
  });

  it('should call handleOpenUserDialog when clicking Change username', () => {
    renderComponent();

    const userButton = screen.getByText('Alterar nome de usuário');
    fireEvent.click(userButton);

    expect(mockHandleOpenUserDialog).toHaveBeenCalledTimes(1);
  });

  it('should call handleOpenPasswordDialog when clicking Change password', () => {
    renderComponent();

    const passwordButton = screen.getByText('Alterar senha');
    fireEvent.click(passwordButton);

    expect(mockHandleOpenPasswordDialog).toHaveBeenCalledTimes(1);
  });

  it('should render the logout button', () => {
    renderComponent();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('should call handleLogout when clicking the logout button', () => {
    renderComponent();

    const logoutButton = screen.getByText('Sair');
    fireEvent.click(logoutButton);

    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
  });

  it('should render the login icon in the logout button', () => {
    renderComponent();

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should handle user without displayName', () => {
    const userWithoutName = {
      displayName: undefined,
      email: 'teste@example.com',
    } as unknown as User;

    render(
      <Dialog open>
        <DialogMenu
          user={userWithoutName}
          handleLogout={mockHandleLogout}
          handleOpenUserDialog={mockHandleOpenUserDialog}
          handleOpenPasswordDialog={mockHandleOpenPasswordDialog}
        />
      </Dialog>
    );

    expect(screen.getByText('teste@example.com')).toBeInTheDocument();
  });

  it('should handle user without email', () => {
    const userWithoutEmail = {
      displayName: 'Usuário Teste',
      email: undefined,
    } as unknown as User;

    render(
      <Dialog open>
        <DialogMenu
          user={userWithoutEmail}
          handleLogout={mockHandleLogout}
          handleOpenUserDialog={mockHandleOpenUserDialog}
          handleOpenPasswordDialog={mockHandleOpenPasswordDialog}
        />
      </Dialog>
    );

    expect(screen.getByText('Usuário Teste')).toBeInTheDocument();
  });
});
