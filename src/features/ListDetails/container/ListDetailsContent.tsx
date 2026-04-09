'use client';
import { Dialog } from '@/src/components/ui/dialog';
import { BookTable } from '../../BookTable/container';
import { NewListForm } from '../../ListTab/container/NewListForm';
import { ListsHeader } from '../components/ListsHeader';
import { DeleteListModal } from '../components/DeleteListModal';
import { format } from 'date-fns';
import { useListDetails } from '../hooks/useListDetails';
import Image from 'next/image';

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
  } = useListDetails(id);

  if (!list) return null;

  return (
    <div>
      <ListsHeader setOpenDeleteDialog={setOpenDeleteDialog} setOpenEditModal={setOpenEditModal} />

      <main className="space-y-4">
        <div className={`flex flex-col max-sm:space-y-4 sm:flex-row justify-center sm:items-center sm:space-x-4`}>
          {list.imageUrl && (
            <div>
              <Image src={list.imageUrl} alt={list.name} width={200} height={200} className="rounded-md m-auto" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-center">{list.name}</h1>
            <h2 className="text-muted-foreground text-center">{list.description}</h2>
            <h3 className="text-muted-foreground text-center">{format(list.createdAt.toDate(), 'dd/MM/yyyy')}</h3>
          </div>
        </div>

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
