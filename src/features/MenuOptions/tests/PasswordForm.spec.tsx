import { render, screen, fireEvent } from '@testing-library/react';
import { usePasswordForm } from '../hooks/usePasswordForm';
import { PasswordForm } from '../container/PasswordForm';
import { Dialog } from '@/src/components/ui/dialog';

jest.mock('../hooks/usePasswordForm');

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('../../../components/FormErrorMessage', () => ({
  FormErrorMessage: ({
    showMessage,
    message,
  }: {
    showMessage: boolean;
    message: string;
  }) => (showMessage ? <div data-testid="error-message">{message}</div> : null),
}));

const mockHandleChangePassword = jest.fn();
const mockHandleSubmit = jest.fn();
const mockRegister = jest.fn().mockReturnValue({});

describe('PasswordForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (usePasswordForm as jest.Mock).mockReturnValue({
      handleChangePassword: mockHandleChangePassword,
      handleSubmit: mockHandleSubmit,
      register: mockRegister,
      errorPassMessage: '',
      errorPreviousPassMessage: '',
      isChanging: false,
    });
  });

  const renderComponent = () =>
    render(
      <Dialog open>
        <PasswordForm />
      </Dialog>
    );

  it('should render the dialog title', () => {
    renderComponent();
    expect(screen.getByText('Alterar senha')).toBeInTheDocument();
  });

  it('should render the label for current password', () => {
    renderComponent();
    expect(screen.getByText('Escreva sua senha atual')).toBeInTheDocument();
  });

  it('should render the label for new password', () => {
    renderComponent();
    expect(screen.getByText('Escreva sua nova senha')).toBeInTheDocument();
  });

  it('should render the input for current password', () => {
    renderComponent();
    const input = screen.getAllByPlaceholderText('Ex: ahneS321$#');
    expect(input[0]).toBeInTheDocument();
  });

  it('should render the input for new password', () => {
    renderComponent();
    const inputs = screen.getAllByPlaceholderText('Ex: ahneS321$#');
    expect(inputs).toHaveLength(2);
  });

  it('should register previousPassword field correctly', () => {
    renderComponent();
    expect(mockRegister).toHaveBeenCalledWith('previousPassword');
  });

  it('should register password field correctly', () => {
    renderComponent();
    expect(mockRegister).toHaveBeenCalledWith('password');
  });

  it('should render the cancel button', () => {
    renderComponent();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('should render the save button', () => {
    renderComponent();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('should have form with correct id', () => {
    renderComponent();
    const form = document.querySelector('form');
    expect(form).toHaveAttribute('id', 'password-form');
  });

  it('should have save button with form attribute', () => {
    renderComponent();
    const saveButton = screen.getByText('Salvar');
    expect(saveButton).toHaveAttribute('form', 'password-form');
  });

  it('should have save button with type submit', () => {
    renderComponent();
    const saveButton = screen.getByText('Salvar');
    expect(saveButton).toHaveAttribute('type', 'submit');
  });

  it('should call handleSubmit when form is submitted', () => {
    renderComponent();
    const form = document.querySelector('form');
    fireEvent.submit(form!);
    expect(mockHandleSubmit).toHaveBeenCalledWith(mockHandleChangePassword);
  });

  it('should not show error messages when there are no errors', () => {
    renderComponent();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('should show error message for previous password when errorPreviousPassMessage exists', () => {
    (usePasswordForm as jest.Mock).mockReturnValue({
      handleChangePassword: mockHandleChangePassword,
      handleSubmit: mockHandleSubmit,
      register: mockRegister,
      errorPassMessage: '',
      errorPreviousPassMessage: 'Senha atual incorreta',
      isChanging: false,
    });

    renderComponent();
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Senha atual incorreta'
    );
  });

  it('should show error message for new password when errorPassMessage exists', () => {
    (usePasswordForm as jest.Mock).mockReturnValue({
      handleChangePassword: mockHandleChangePassword,
      handleSubmit: mockHandleSubmit,
      register: mockRegister,
      errorPassMessage: 'Senha muito fraca',
      errorPreviousPassMessage: '',
      isChanging: false,
    });

    renderComponent();
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Senha muito fraca'
    );
  });

  it('should disable buttons when isChanging is true', () => {
    (usePasswordForm as jest.Mock).mockReturnValue({
      handleChangePassword: mockHandleChangePassword,
      handleSubmit: mockHandleSubmit,
      register: mockRegister,
      errorPassMessage: '',
      errorPreviousPassMessage: '',
      isChanging: true,
    });

    renderComponent();

    const cancelButton = screen.getByText('Cancelar');
    const saveButton = screen.getByText('Salvando...');

    expect(cancelButton).toBeDisabled();
    expect(saveButton).toBeDisabled();
  });

  it('should show "Salvando..." text when isChanging is true', () => {
    (usePasswordForm as jest.Mock).mockReturnValue({
      handleChangePassword: mockHandleChangePassword,
      handleSubmit: mockHandleSubmit,
      register: mockRegister,
      errorPassMessage: '',
      errorPreviousPassMessage: '',
      isChanging: true,
    });

    renderComponent();
    expect(screen.getByText('Salvando...')).toBeInTheDocument();
    expect(screen.queryByText('Salvar')).not.toBeInTheDocument();
  });

  it('should show "Salvar" text when isChanging is false', () => {
    renderComponent();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
    expect(screen.queryByText('Salvando...')).not.toBeInTheDocument();
  });

  it('should accept input values', () => {
    renderComponent();
    const inputs = screen.getAllByPlaceholderText('Ex: ahneS321$#');

    fireEvent.change(inputs[0], { target: { value: 'currentPass123' } });
    fireEvent.change(inputs[1], { target: { value: 'newPass456' } });

    expect(inputs[0]).toHaveValue('currentPass123');
    expect(inputs[1]).toHaveValue('newPass456');
  });

  it('should have correct CSS classes on form', () => {
    renderComponent();
    const form = document.querySelector('form');
    expect(form).toHaveClass('flex', 'flex-col', 'gap-4');
  });
});
