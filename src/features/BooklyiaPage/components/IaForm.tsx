import { Button } from "@/src/components/ui/button";
import { Spinner } from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { Send } from "lucide-react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

type IaFormType = {
  handleSubmit: UseFormHandleSubmit<{ prompt: string }>;
  handleSearch: (data: { prompt: string }) => Promise<void>;
  register: UseFormRegister<{ prompt: string }>;
  isPending: boolean;
};

export const IaForm = ({
  handleSubmit,
  handleSearch,
  register,
  isPending,
}: IaFormType) => (
  <form
    onSubmit={handleSubmit(handleSearch)}
    className="flex justify-center gap-2 m-auto mt-8 w-full"
  >
    <Textarea
      className="resize-none max-w-2xl min-h-10 max-h-20"
      placeholder="Peça livros..."
      {...register("prompt")}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit(handleSearch)();
        }
      }}
    />
    <Button className="mt-auto" disabled={isPending}>
      {isPending ? <Spinner /> : <Send />}
    </Button>
  </form>
);
