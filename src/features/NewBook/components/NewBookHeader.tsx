"use client";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export const NewBookHeader = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between">
      <div className="flex space-x-6 items-center">
        <Button
          data-testid="back-button"
          onClick={() => router.back()}
          variant="ghost"
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg sm:text-2xl font-semibold">
          Adicionar Novo Livro
        </h1>
      </div>
      <Button type="submit" form="book-form">
        <Save />
        <p>Salvar</p>
      </Button>
    </header>
  );
};
