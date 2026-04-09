import { Button } from '@/src/components/ui/button';
import { ArrowLeft, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

type ListsHeaderProps = {
  setOpenEditModal: (open: boolean) => void;
  setOpenDeleteDialog: (open: boolean) => void;
};

export const ListsHeader = ({ setOpenEditModal, setOpenDeleteDialog }: ListsHeaderProps) => (
  <header className="flex justify-between items-center mb-8">
    <Link href="/?tab=lists" replace>
      <Button data-testid="back-button" variant="outline" className="rounded-full w-12 h-12">
        <ArrowLeft className="w-auto h-auto" />
      </Button>
    </Link>

    <div className="flex space-x-4">
      <Button onClick={() => setOpenEditModal(true)} variant="outline" className="rounded-full w-12 h-12">
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
