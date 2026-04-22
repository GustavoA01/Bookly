import { render, screen, fireEvent } from '@testing-library/react';
import { User } from 'firebase/auth';
import { DrawerMenu } from '../components/DrawerMenu';
import { Drawer } from '@/src/components/ui/drawer';

const mockHandleLogout = jest.fn();
const mockHandleOpenUserDialog = jest.fn();
const mockHandleOpenPasswordDialog = jest.fn();

const mockUser = {
  displayName: 'João Silva',
  email: 'joao@example.com',
} as User;

describe('DrawerMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Drawer open>
        <DrawerMenu
          user={mockUser}
          handleLogout={mockHandleLogout}
          handleOpenUserDialog={mockHandleOpenUserDialog}
          handleOpenPasswordDialog={mockHandleOpenPasswordDialog}
        />
      </Drawer>
    );

  it('should render the drawer with user name and email', () => {
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
      <Drawer open>
        <DrawerMenu
          user={userWithoutName}
          handleLogout={mockHandleLogout}
          handleOpenUserDialog={mockHandleOpenUserDialog}
          handleOpenPasswordDialog={mockHandleOpenPasswordDialog}
        />
      </Drawer>
    );

    expect(screen.getByText('teste@example.com')).toBeInTheDocument();
  });

  it('should handle user without email', () => {
    const userWithoutEmail = {
      displayName: 'Usuário Teste',
      email: undefined,
    } as unknown as User;

    render(
      <Drawer open>
        <DrawerMenu
          user={userWithoutEmail}
          handleLogout={mockHandleLogout}
          handleOpenUserDialog={mockHandleOpenUserDialog}
          handleOpenPasswordDialog={mockHandleOpenPasswordDialog}
        />
      </Drawer>
    );

    expect(screen.getByText('Usuário Teste')).toBeInTheDocument();
  });
});
