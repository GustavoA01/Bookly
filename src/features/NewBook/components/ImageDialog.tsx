import { Button } from "@/src/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";

export const ImageDialog = () => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Adicionar Capa do Livro</DialogTitle>
      <DialogDescription>
        Faça upload de uma imagem ou cole uma URL da web
      </DialogDescription>
    </DialogHeader>

    <div className="flex flex-col gap-4">
      <Input placeholder="Ex: https://..." />

      <label
        htmlFor="select-image"
        className="flex items-center justify-center border rounded-xl bg-card p-0 h-20 cursor-pointer"
      >
        <Input id="select-image" type="file" className="hidden" />
        <div className="flex flex-col items-center justify-center gap-2">
          <Search size={18} className="cursor-pointer text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Selecionar Imagem</p>
        </div>
      </label>
    </div>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Fechar</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>Salvar</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
);
