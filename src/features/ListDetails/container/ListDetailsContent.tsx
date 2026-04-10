'use client';
import { Dialog } from '@/src/components/ui/dialog';
import { BookTable } from '../../BookTable/container';
import { NewListForm } from '../../ListTab/container/NewListForm';
import { ListsHeader } from '../components/ListsHeader';
import { DeleteListModal } from '../components/DeleteListModal';
import { format } from 'date-fns';
import { ListInfo } from '../components/ListInfo';
import { useListDetails } from '../hooks/useListDetails';
import ListDetailsError from '@/src/app/lista/[id]/error';
import ListDetailsLoading from '@/src/app/lista/[id]/loading';

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
  } = useListDetails(id);

  if (isListLoading) return <ListDetailsLoading />;
  if (!list)
    return <ListDetailsError error={new Error('Lista não encontrada')} />;

  return (
    <div>
      <ListsHeader
        setOpenDeleteDialog={setOpenDeleteDialog}
        setOpenEditModal={setOpenEditModal}
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
    </div>
  );
};
