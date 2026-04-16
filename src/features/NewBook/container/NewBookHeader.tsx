'use client';
import { Button } from '@/src/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NewBookHeader = () => {
  const { back } = useRouter();

  return (
    <header className="flex justify-between">
      <div className="flex space-x-6 items-center">
        <Button
          variant="ghost"
          onClick={() => back()}
          data-testid="back-button"
        >
          <ArrowLeft />
        </Button>

        <h1 className="text-lg sm:text-2xl font-semibold">
          Adicionar Novo Livro
        </h1>
      </div>

      <Button form="book-form">
        <Save />
        <p>Salvar</p>
      </Button>
    </header>
  );
};
