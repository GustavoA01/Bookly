import { Button } from '@/src/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';

export const DeleteBookModal = ({ deleteFn }: { deleteFn: () => void }) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Excluir livro</DialogTitle>
      <DialogDescription>
        Tem certeza que deseja excluir este livro? Ele também será deletado de todas as listas em que está.
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
