"use client";
import { Button } from "@/src/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

export const NewListForm = () => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Criar Nova Lista</DialogTitle>
      <DialogDescription>
        Crie listas personalizadas e adicione livros a elas.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button onClick={() => {}}>Salvar</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
);
