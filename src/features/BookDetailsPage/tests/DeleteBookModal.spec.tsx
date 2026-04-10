import { Dialog } from '@/src/components/ui/dialog';
import { DeleteBookModal } from '../components/DeleteBookModal';
import { render } from '@testing-library/react';

describe('DeleteBookModal', () => {
  it('should call deleteFn when the delete button is clicked', () => {
    const deleteFn = jest.fn();

    const { getByText } = render(
      <Dialog open>
        <DeleteBookModal deleteFn={deleteFn} />
      </Dialog>
    );
    const deleteButton = getByText('Excluir');
    deleteButton.click();

    expect(getByText('Excluir livro')).toBeInTheDocument();
    expect(
      getByText(
        'Tem certeza que deseja excluir este livro? Ele também será deletado de todas as listas em que está.'
      )
    ).toBeInTheDocument();
    expect(deleteFn).toHaveBeenCalled();
  });
});
