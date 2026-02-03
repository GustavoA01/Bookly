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
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const listSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type ListFormType = z.infer<typeof listSchema>;

export const NewListForm = () => {
  const { register, handleSubmit } = useForm<ListFormType>({
    resolver: zodResolver(listSchema),
  });

  const handleCreateList = (data: ListFormType) => {
    console.log(data);
  };

  return (
    <DialogContent showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>Criar Nova Lista</DialogTitle>
        <DialogDescription>
          Crie listas personalizadas e adicione livros a elas.
        </DialogDescription>
      </DialogHeader>

      <form
        id="new-list-form"
        onSubmit={handleSubmit(handleCreateList)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label>Nome</Label>
          <Input {...register("name")} placeholder="Ex: Fantasia" />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Descrição</Label>
          <Textarea
            {...register("description")}
            placeholder="Melhores livros..."
            className="resize-none"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Selecionar Imagem</Label>
          <Input placeholder="Ex: https://..." {...register("imageUrl")} />

          <label
            htmlFor="select-image"
            className="flex items-center justify-center border rounded-xl bg-card p-0 h-20 cursor-pointer"
          >
            <Input id="select-image" type="file" className="hidden" />
            <div className="flex flex-col items-center justify-center gap-2">
              <ImageUp
                size={18}
                className="cursor-pointer text-muted-foreground"
              />
            </div>
          </label>
        </div>
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button form="new-list-form" type="submit">
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
