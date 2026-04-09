import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/src/components/ui/dropdown-menu';
import Link from 'next/link';

type ListOptionsProps = {
  listId: string;
  setOpenRemoveBookModal: (open: boolean) => void;
  setListIdToRemove: (id: string) => void;
};

export const ListOptions = ({ listId, setOpenRemoveBookModal, setListIdToRemove }: ListOptionsProps) => (
  <DropdownMenuGroup>
    <DropdownMenuContent className="w-40">
      <DropdownMenuItem className="w-full" asChild>
        <Link href={`/lista/${listId}`}>Ir para lista</Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => {
          setOpenRemoveBookModal(true);
          setListIdToRemove(listId);
        }}
      >
        Remover
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuGroup>
);
