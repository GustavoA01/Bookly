import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { ListFormType } from "@/src/data/schemas";
import { UseFormRegister } from "react-hook-form";

type DescriptionFormProps = {
  register: UseFormRegister<ListFormType>;
};

export const DescriptionForm = ({ register }: DescriptionFormProps) => (
  <>
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
  </>
);
