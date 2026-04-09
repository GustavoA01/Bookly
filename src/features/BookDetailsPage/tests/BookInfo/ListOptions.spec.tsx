import { DropdownMenu } from '@/src/components/ui/dropdown-menu';
import { fireEvent, render, screen } from '@testing-library/react';
import { ListOptions } from '../../components/BookInfo/ListOptions';

describe('ListOptions', () => {
  it('renders the component correctly', () => {
    const mockSetOpenRemoveBookModal = jest.fn();
    const mockSetListIdToRemove = jest.fn();
    render(
      <DropdownMenu open>
        <ListOptions
          listId="123"
          setListIdToRemove={mockSetListIdToRemove}
          setOpenRemoveBookModal={mockSetOpenRemoveBookModal}
        />
      </DropdownMenu>
    );

    const listLink = screen.getByText('Ir para lista');
    const removeOption = screen.getByText('Remover');
    fireEvent.click(removeOption);

    expect(listLink).toBeInTheDocument();
    expect(listLink.closest('a')).toHaveAttribute('href', '/lista/123');
    expect(removeOption).toBeInTheDocument();
    expect(mockSetOpenRemoveBookModal).toHaveBeenCalledWith(true);
    expect(mockSetListIdToRemove).toHaveBeenCalledWith('123');
  });
});
