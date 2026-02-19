import { Button } from "@/src/components/ui/button";
import { DialogClose, DialogFooter } from "@/src/components/ui/dialog";

export const FormFooter = () => (
  <DialogFooter>
    <DialogClose asChild>
      <Button variant="outline">Cancelar</Button>
    </DialogClose>
    <Button form="new-list-form" type="submit">
      Criar
    </Button>
  </DialogFooter>
);
