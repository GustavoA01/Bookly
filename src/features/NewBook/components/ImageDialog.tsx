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
import { BookFormType } from "@/src/data/schemas";
import { ImageUp } from "lucide-react";
import { useFormContext } from "react-hook-form";

type ImageDialogProps = {
  choosedFile: string | undefined;
  setChoosedFile: (file: string | undefined) => void;
  showImage: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  chooseImageError: string | undefined | null;
};

export const ImageDialog = ({
  choosedFile,
  setChoosedFile,
  handleFileChange,
  chooseImageError,
}: ImageDialogProps) => {
  const { register, setValue } = useFormContext<BookFormType>();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Imagem do Livro</DialogTitle>
        <DialogDescription>
          Faça upload de uma imagem ou cole uma URL da web
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        <Input
          {...register("imageUrl")}
          placeholder="Ex: https://..."
          onChange={(e) => {
            const value = e.target.value;
            register("imageUrl").onChange(e);
            if (value) setValue("imageFile", undefined);
            if (value.startsWith("http")) setChoosedFile(value);
            else if (choosedFile) setChoosedFile(undefined);
          }}
        />

        <label
          htmlFor="select-image"
          className="flex items-center justify-center border rounded-xl bg-card p-4 h-auto cursor-pointer"
        >
          <Input
            id="select-image"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <ImageUp
              size={18}
              className="cursor-pointer text-muted-foreground"
            />
          </div>
        </label>
        {chooseImageError && (
          <p className="text-sm text-red-600">{chooseImageError}</p>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Fechar</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
