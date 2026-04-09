'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { AlertCircle, Home, RefreshCw, BookX } from 'lucide-react';

type BookDetailsErrorProps = {
  error?: Error | null;
};

const BookDetailsError = ({ error }: BookDetailsErrorProps) => {
  const router = useRouter();

  const isNotFoundError = error?.message?.includes('not-found') || error?.message?.includes('NOT_FOUND');

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {isNotFoundError ? (
              <BookX className="w-16 h-16 text-destructive" />
            ) : (
              <AlertCircle className="w-16 h-16 text-destructive" />
            )}
          </div>

          <CardTitle className="text-2xl">
            {isNotFoundError ? 'Livro não encontrado' : 'Ops! Algo deu errado'}
          </CardTitle>

          <CardDescription>
            {isNotFoundError
              ? 'Não foi possível encontrar este livro no seu catálogo.'
              : 'Ocorreu um erro ao carregar os detalhes deste livro.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          {!isNotFoundError && error?.message && (
            <p className="mb-2 wrap-break-word">
              <strong>Erro:</strong> {error.message}
            </p>
          )}
          <p>
            {isNotFoundError
              ? 'Verifique se o livro foi adicionado corretamente à sua biblioteca.'
              : 'Tente uma das opções abaixo para continuar.'}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <div className="flex gap-3 w-full">
            {!isNotFoundError && (
              <Button onClick={() => window.location.reload()} variant="outline" className="flex-1 gap-2">
                <RefreshCw className="w-4 h-4" />
                Tentar novamente
              </Button>
            )}
            <Button onClick={() => router.push('/')} className="flex-1 gap-2">
              <Home className="w-4 h-4" />
              Ir para o início
            </Button>
          </div>

          <Button onClick={() => router.back()} variant="ghost" size="sm">
            Voltar para página anterior
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookDetailsError;
