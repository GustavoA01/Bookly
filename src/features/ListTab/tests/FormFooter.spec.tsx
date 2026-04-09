import { render, screen } from '@testing-library/react';
import { FormFooter } from '../components/NewListForm/FormFooter';
import { Dialog } from '@/src/components/ui/dialog';

describe('FormFooter', () => {
  it('should render the component correctly', () => {
    render(
      <Dialog open>
        <FormFooter />
      </Dialog>
    );
    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveTextContent('Cancelar');
    expect(buttons[1]).toHaveTextContent('Salvar');
  });
});
