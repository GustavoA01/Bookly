import { CategorySelect } from "@/src/components/CategorySelect";
import { Card } from "@/src/components/ui/card";
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { ImageUp } from "lucide-react";
import { ImageDialog } from "./ImageDialog";
import { UseFormRegister } from "react-hook-form";
import { BookFormType } from "@/src/data/schemas";

export const ImageForm = ({
  register,
}: {
  register: UseFormRegister<BookFormType>;
}) => (
  <div className="col-span-2 flex flex-col gap-4 p-4">
    <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:space-x-2">
      <div className="space-y-2 cols-span-1">
        <Label>Nota</Label>
        <Input type="number" placeholder="Ex: 10" {...register("rating")} />
      </div>

      <div className="space-y-2 cols-span-1">
        <Label>Status</Label>
        <CategorySelect className="w-full" />
      </div>
    </div>

    <Dialog>
      <DialogTrigger>
        <Card className="h-64 w-full border border-dashed bg-transparent cursor-pointer hover:border-primary transition-all duration-250">
          <div className="flex flex-col m-auto items-center justify-center gap-2 text-muted-foreground">
            <ImageUp />
            <p>Capa do livro</p>
          </div>
        </Card>
      </DialogTrigger>
      <ImageDialog />
    </Dialog>
  </div>
);
