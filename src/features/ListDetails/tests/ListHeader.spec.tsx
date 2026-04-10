import { render, fireEvent } from '@testing-library/react';
import { ListsHeader } from '../components/ListsHeader';

jest.mock('next/link', () => {
  const linkComponent = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid={`link-${href}`}>
      {children}
    </a>
  );
  linkComponent.displayName = 'Link';
  return linkComponent;
});

describe('ListsHeader', () => {
  it('renders all three buttons', () => {
    const onClickEdit = jest.fn();
    const onClickDelete = jest.fn();

    const { getByTestId } = render(
      <ListsHeader
        setOpenEditModal={onClickEdit}
        setOpenDeleteDialog={onClickDelete}
      />
    );

    expect(getByTestId('back-button')).toBeInTheDocument();
    expect(getByTestId('edit-button')).toBeInTheDocument();
    expect(getByTestId('delete-button')).toBeInTheDocument();
  });

  it('calls setOpenEditModal when edit button is clicked', () => {
    const onClickEdit = jest.fn();
    const onClickDelete = jest.fn();

    const { getByTestId } = render(
      <ListsHeader
        setOpenEditModal={onClickEdit}
        setOpenDeleteDialog={onClickDelete}
      />
    );

    const editButton = getByTestId('edit-button');
    fireEvent.click(editButton);

    expect(onClickEdit).toHaveBeenCalledTimes(1);
    expect(onClickEdit).toHaveBeenCalledWith(true);
  });

  it('calls setOpenDeleteDialog when delete button is clicked', () => {
    const onClickEdit = jest.fn();
    const onClickDelete = jest.fn();

    const { getByTestId } = render(
      <ListsHeader
        setOpenEditModal={onClickEdit}
        setOpenDeleteDialog={onClickDelete}
      />
    );

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(onClickDelete).toHaveBeenCalledTimes(1);
    expect(onClickDelete).toHaveBeenCalledWith(true);
  });

  it('renders back button with correct link', () => {
    const onClickEdit = jest.fn();
    const onClickDelete = jest.fn();

    const { getByTestId } = render(
      <ListsHeader
        setOpenEditModal={onClickEdit}
        setOpenDeleteDialog={onClickDelete}
      />
    );

    const backLink = getByTestId('link-/?tab=lists');
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/?tab=lists');
  });
});
