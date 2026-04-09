import { Button } from '@/src/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/src/components/ui/dialog';

export const RemoveListModal = ({ removeFn }: { removeFn: () => void }) => (
  <DialogContent>
    <DialogTitle>Remover livro da lista</DialogTitle>
    <DialogDescription>Tem certeza que deseja remover este livro da lista?</DialogDescription>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button variant="destructive" onClick={removeFn}>
        Remover
      </Button>
    </DialogFooter>
  </DialogContent>
);
