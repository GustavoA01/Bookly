import { Button } from '@/src/components/ui/button';
import { ArrowLeft, BookPlus, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

type ListsHeaderProps = {
  setOpenEditModal: (open: boolean) => void;
  setOpenDeleteDialog: (open: boolean) => void;
  setOpenDrawer: (open: boolean) => void;
  setOpenBooksModal: (open: boolean) => void;
};

export const ListsHeader = ({
  setOpenEditModal,
  setOpenDeleteDialog,
  setOpenDrawer,
  setOpenBooksModal,
}: ListsHeaderProps) => (
  <header className="flex justify-between items-center mb-8">
    <Link href="/?tab=lists" replace>
      <Button
        data-testid="back-button"
        variant="outline"
        className="rounded-full w-12 h-12"
      >
        <ArrowLeft className="w-auto h-auto" />
      </Button>
    </Link>

    <div className="flex space-x-4">
      <Button
        data-testid="add-button"
        variant="outline"
        className="sm:hidden rounded-full w-12 h-12"
        onClick={() => setOpenDrawer(true)}
      >
        <BookPlus className="w-auto h-auto" />
      </Button>
      <Button
        data-testid="add-button"
        variant="outline"
        className="hidden sm:flex rounded-full w-12 h-12"
        onClick={() => setOpenBooksModal(true)}
      >
        <BookPlus className="w-auto h-auto" />
      </Button>
      <Button
        data-testid="edit-button"
        variant="outline"
        className="rounded-full w-12 h-12"
        onClick={() => setOpenEditModal(true)}
      >
        <Pencil className="w-auto h-auto" />
      </Button>
      <Button
        data-testid="delete-button"
        variant="outline"
        className="rounded-full w-12 h-12"
        onClick={() => setOpenDeleteDialog(true)}
      >
        <Trash className="w-auto h-auto" />
      </Button>
    </div>
  </header>
);
