import { render, screen } from '@testing-library/react';
import { DeleteListModal } from '../components/DeleteListModal';
import { Dialog } from '@/src/components/ui/dialog';

describe('DeleteListModal', () => {
  it('renders component correctly', () => {
    render(
      <Dialog open>
        <DeleteListModal deleteFn={jest.fn()} />
      </Dialog>
    );
    expect(screen.getByText('Excluir lista')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Tem certeza que deseja excluir esta lista? Os livros contidos nela não serão deletados.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cancelar' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();
  });

  it('calls deleteFn when "Excluir" button is clicked', () => {
    const deleteFn = jest.fn();
    render(
      <Dialog open>
        <DeleteListModal deleteFn={deleteFn} />
      </Dialog>
    );

    const deleteButton = screen.getByRole('button', { name: 'Excluir' });
    deleteButton.click();
    expect(deleteFn).toHaveBeenCalled();
  });
});
