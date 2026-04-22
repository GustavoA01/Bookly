import { render, screen, fireEvent } from '@testing-library/react';
import { useNameForm } from '../hooks/useNameForm';
import { NameForm } from '../container/NameForm';
import { Dialog } from '@/src/components/ui/dialog';

jest.mock('../hooks/useNameForm');
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  updateProfile: jest.fn(),
}));

const mockHandleChangeName = jest.fn();
const mockHandleSubmit = jest.fn();
const mockRegister = jest.fn().mockReturnValue({});

describe('NameForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useNameForm as jest.Mock).mockReturnValue({
      handleChangeName: mockHandleChangeName,
      handleSubmit: mockHandleSubmit,
      register: mockRegister,
    });
  });

  const renderComponent = () =>
    render(
      <Dialog open>
        <NameForm />
      </Dialog>
    );

  it('should render the dialog title', () => {
    renderComponent();
    expect(screen.getByText('Alterar nome de usuário')).toBeInTheDocument();
  });

  it('should render the label', () => {
    renderComponent();
    expect(screen.getByText('Escreva seu novo nome')).toBeInTheDocument();
  });

  it('should render the input field', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Ex: Jão da Silva');

    expect(input).toBeInTheDocument();
  });

  it('should render the cancel button', () => {
    renderComponent();
    const cancelButton = screen.getByText('Cancelar');

    expect(cancelButton).toBeInTheDocument();
  });

  it('should render the save button', () => {
    renderComponent();
    const saveButton = screen.getByText('Salvar');

    expect(saveButton).toBeInTheDocument();
  });

  it('should register the input field correctly', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Ex: Jão da Silva');

    expect(mockRegister).toHaveBeenCalledWith('name');
    expect(input).toBeInTheDocument();
  });

  it('should call handleSubmit when form is submitted', () => {
    renderComponent();

    const form = document.querySelector('form');
    fireEvent.submit(form!);

    expect(form).toHaveAttribute('id', 'name-form');
    expect(mockHandleSubmit).toHaveBeenCalledWith(mockHandleChangeName);
  });

  it('should have the correct form id', () => {
    renderComponent();
    const form = document.querySelector('form');

    expect(form).toHaveAttribute('id', 'name-form');
  });

  it('should have the save button with type submit', () => {
    renderComponent();
    const saveButton = screen.getByText('Salvar');

    expect(saveButton).toHaveAttribute('type', 'submit');
  });

  it('should have the save button with form attribute pointing to name-form', () => {
    renderComponent();
    const saveButton = screen.getByText('Salvar');

    expect(saveButton).toHaveAttribute('form', 'name-form');
  });

  it('should have the correct CSS classes on form', () => {
    renderComponent();
    const form = document.querySelector('form');

    expect(form).toHaveClass('flex', 'flex-col', 'gap-4');
  });

  it('should accept input value changes', () => {
    renderComponent();

    const input = screen.getByPlaceholderText(
      'Ex: Jão da Silva'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Novo Nome' } });

    expect(input.value).toBe('Novo Nome');
  });

  it('should call handleChangeName when form is submitted with valid data', () => {
    (mockHandleSubmit as jest.Mock).mockImplementation((callback) => {
      return (e: React.FormEvent) => {
        e.preventDefault();
        callback();
      };
    });

    renderComponent();

    const input = screen.getByPlaceholderText('Ex: Jão da Silva');
    fireEvent.change(input, { target: { value: 'João Silva' } });

    const form = document.querySelector('form');
    fireEvent.submit(form!);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
