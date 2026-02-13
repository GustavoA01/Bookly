import { StatusSelect } from "@/src/components/StatusSelect";
import { Card } from "@/src/components/ui/card";
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { ImageOff, ImageUp } from "lucide-react";
import { ImageDialog } from "./ImageDialog";
import { UseFormRegister } from "react-hook-form";
import { BookFormType } from "@/src/data/schemas";
import { Dispatch, SetStateAction } from "react";
import { Status } from "@/src/data/types/books";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";

type ImageFormProps = {
  register: UseFormRegister<BookFormType>;
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  choosedFile: string | undefined;
  setChoosedFile: (file: string | undefined) => void;
  showImage: boolean;
  chooseImageError?: string | null;
  handleImageError: () => void;
  cleanCurrentImage: () => void;
};

export const ImageForm = ({
  register,
  status,
  setStatus,
  handleFileChange,
  choosedFile,
  setChoosedFile,
  showImage,
  chooseImageError,
  handleImageError,
  cleanCurrentImage,
}: ImageFormProps) => (
  <div className="col-span-2 flex flex-col gap-4 p-4">
    <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:space-x-2">
      <div className="space-y-2 cols-span-1">
        <Label>Nota</Label>
        <Input
          type="number"
          placeholder="Ex: 10"
          {...register("rating", {
            setValueAs: (val) => (val === "" ? undefined : Number(val)),
          })}
        />
      </div>

      <div className="space-y-2 cols-span-1">
        <Label>Status</Label>
        <StatusSelect
          value={status}
          onValueChange={setStatus as Dispatch<SetStateAction<Status>>}
          className="w-full"
        />
      </div>
    </div>

    <Dialog>
      <DialogTrigger>
        <Card className="h-auto w-full border border-dashed bg-transparent cursor-pointer hover:border-primary transition-all duration-250">
          <div className="flex flex-col m-auto items-center justify-center gap-2 text-muted-foreground">
            {showImage ? (
              <Image
                src={choosedFile!}
                alt="Preview"
                width={200}
                height={300}
                onError={handleImageError}
                className="rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <ImageUp />
                <p>Escolher imagem do livro</p>
              </div>
            )}
          </div>
        </Card>
      </DialogTrigger>

      {choosedFile && (
        <Button
          variant="destructive"
          className="w-full h-8"
          onClick={cleanCurrentImage}
        >
          <ImageOff />
        </Button>
      )}

      <ImageDialog
        choosedFile={choosedFile}
        handleFileChange={handleFileChange}
        setChoosedFile={setChoosedFile}
        showImage={showImage}
        chooseImageError={chooseImageError}
      />
    </Dialog>
  </div>
);
