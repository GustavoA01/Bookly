'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/src/components/ui/dialog';
import { BookTable } from '../../BookTable/container';
import { NewListForm } from '../../ListTab/container/NewListForm';
import { ListsHeader } from '../components/ListsHeader';
import { DeleteListModal } from '../components/DeleteListModal';
import { format } from 'date-fns';
import { ListInfo } from '../components/ListInfo';
import { useListDetails } from '../hooks/useListDetails';
import ListDetailsError from '@/src/app/lista/[id]/error';
import ListDetailsLoading from '@/src/app/lista/[id]/loading';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/src/components/ui/drawer';
import { BooksToAddList } from '../components/BooksToAddList';
import { DialogTitle } from '@radix-ui/react-dialog';

export const ListDetailsContent = ({ id }: { id: string }) => {
  const {
    list,
    books,
    isBooksLoading,
    deleteListFn,
    setOpenDeleteDialog,
    setOpenEditModal,
    openDeleteDialog,
    openEditModal,
    isListLoading,
    openBooksDrawer,
    openBooksModal,
    setOpenBooksDrawer,
    setOpenBooksModal,
    booksToAdd,
    isBooksToAddLoading,
    addToListFn,
  } = useListDetails(id);

  if (isListLoading) return <ListDetailsLoading />;
  if (!list)
    return <ListDetailsError error={new Error('Lista não encontrada')} />;

  return (
    <div>
      <ListsHeader
        setOpenDeleteDialog={setOpenDeleteDialog}
        setOpenEditModal={setOpenEditModal}
        setOpenDrawer={setOpenBooksDrawer}
        setOpenBooksModal={setOpenBooksModal}
      />

      <main className="space-y-4">
        <ListInfo
          name={list.name}
          imageUrl={list.imageUrl}
          description={list.description}
          date={format(list.createdAt.toDate(), 'dd/MM/yyyy')}
        />
        <BookTable books={books} isBooksLoading={isBooksLoading} />
      </main>

      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <NewListForm list={list} />
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DeleteListModal deleteFn={() => deleteListFn(id)} />
      </Dialog>

      <Dialog open={openBooksModal} onOpenChange={setOpenBooksModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar livros à lista</DialogTitle>
            <DialogDescription>Escolha um livro</DialogDescription>
          </DialogHeader>
          <BooksToAddList
            booksToAdd={booksToAdd}
            isBooksToAddLoading={isBooksToAddLoading}
            addToListFn={addToListFn}
            listId={list.id}
          />
        </DialogContent>
      </Dialog>

      <Drawer
        open={openBooksDrawer}
        onOpenChange={setOpenBooksDrawer}
        direction="bottom"
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Adicionar livros à lista</DrawerTitle>
            {booksToAdd && booksToAdd.length > 0 && (
              <DrawerDescription>Escolha um livro</DrawerDescription>
            )}
          </DrawerHeader>
          <BooksToAddList
            booksToAdd={booksToAdd}
            isBooksToAddLoading={isBooksToAddLoading}
            addToListFn={addToListFn}
            listId={list.id}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
