import { Button } from '@/src/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';

export const DeleteListModal = ({ deleteFn }: { deleteFn: () => void }) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Excluir lista</DialogTitle>
      <DialogDescription>
        Tem certeza que deseja excluir esta lista? Os livros contidos nela não
        serão deletados.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button variant="destructive" onClick={deleteFn}>
        Excluir
      </Button>
    </DialogFooter>
  </DialogContent>
);
