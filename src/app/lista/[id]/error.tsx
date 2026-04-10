'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { AlertCircle, Home, RefreshCw, ListX } from 'lucide-react';

type ListDetailsErrorProps = {
  error: Error & { digest?: string };
};

const ListDetailsError = ({ error }: ListDetailsErrorProps) => {
  const router = useRouter();

  useEffect(() => {
    console.error('Erro ao carregar lista:', error);
  }, [error]);

  const isNotFoundError =
    error.message?.includes('not-found') ||
    error.message?.includes('NOT_FOUND');

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {isNotFoundError ? (
              <ListX className="w-16 h-16 text-destructive" />
            ) : (
              <AlertCircle className="w-16 h-16 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isNotFoundError ? 'Lista não encontrada' : 'Ops! Algo deu errado'}
          </CardTitle>
          <CardDescription>
            {isNotFoundError
              ? 'Não foi possível encontrar esta lista.'
              : 'Ocorreu um erro ao carregar os detalhes desta lista.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          {!isNotFoundError && error.message && (
            <p className="mb-2 wrap-break-word">
              <strong>Erro:</strong> {error.message}
            </p>
          )}
          <p>
            {isNotFoundError
              ? 'A lista pode ter sido deletada ou o link está quebrado.'
              : 'Tente uma das opções abaixo para continuar.'}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <div className="flex gap-3 w-full">
            {!isNotFoundError && (
              <Button
                onClick={() => router.refresh()}
                variant="outline"
                className="flex-1 gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar novamente
              </Button>
            )}

            <Button onClick={() => router.push('/')} className="flex-1 gap-2">
              <Home className="w-4 h-4" />
              Ir para o início
            </Button>
          </div>

          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            Voltar para página anterior
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ListDetailsError;
