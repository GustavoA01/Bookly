import Link from 'next/link';
import { FileQuestion, Home, Compass } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';

const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen px-4">
    <Card className="max-w-md w-full text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <FileQuestion className="w-16 h-16 text-muted-foreground" />
        </div>
        <CardTitle className="text-2xl">Página não encontrada</CardTitle>
        <CardDescription>
          O endereço que você acessou não existe ou foi movido.
        </CardDescription>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p>
          Confira se o link está correto ou volte para continuar navegando no
          Bookly.
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex gap-3 w-full">
          <Button asChild variant="outline" className="flex-1 gap-2">
            <Link href="/explorar">
              <Compass className="w-4 h-4" />
              Explorar
            </Link>
          </Button>
          <Button asChild className="flex-1 gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Ir para o início
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
);

export default NotFound;
