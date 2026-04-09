import { BackButton } from '@/src/components/BackButton';
import { Button } from '@/src/components/ui/button';
import { Dialog } from '@/src/components/ui/dialog';
import { Pencil, Trash } from 'lucide-react';
import { useDeleteBook } from '../hooks/useDeleteBook';
import { DeleteBookModal } from '../components/DeleteBookModal';
import Link from 'next/link';

export const BookActions = () => {
  const { id, openDeleteDialog, setOpenDeleteDialog, deleteBookFn } = useDeleteBook();

  return (
    <header className="flex justify-between items-center">
      <BackButton />

      <div className="flex space-x-4">
        <Link href={`/novo-livro?id=${id}&role=library`}>
          <Button variant="outline" className="rounded-full w-12 h-12">
            <Pencil className="w-auto h-auto" />
          </Button>
        </Link>
        <Button
          variant="outline"
          data-testid="delete-button"
          className="rounded-full w-12 h-12"
          onClick={() => setOpenDeleteDialog(true)}
        >
          <Trash className="w-auto h-auto" />
        </Button>
      </div>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DeleteBookModal deleteFn={deleteBookFn} />
      </Dialog>
    </header>
  );
};
