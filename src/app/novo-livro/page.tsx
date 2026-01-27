import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

const NewBookPage = () => {
  return (
    <main className="flex flex-col">
      <header className="flex justify-between">
        <div className="flex space-x-6 items-center">
          <ArrowLeft />
          <h1 className="text-lg sm:text-2xl font-semibold">
            Adicionar Novo Livro
          </h1>
        </div>
        <Button>
          <Save />
          <p>Salvar</p>
        </Button>
      </header>
    </main>
  );
};

export default NewBookPage;
