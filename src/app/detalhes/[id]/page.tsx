import { BackButton } from '@/src/components/BackButton';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { BookDetails } from '@/src/features/BookDetailsPage/container/BookDetails';
import { getGoogleBookById } from '@/src/services/google/getGoogleBookById';
import { BookX, Home } from 'lucide-react';
import Link from 'next/link';

const BookNotFound = () => (
  <div className="space-y-8">
    <BackButton />
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <BookX className="w-16 h-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Livro não encontrado</CardTitle>
          <CardDescription>
            Não foi possível carregar os detalhes deste livro agora.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          A fonte externa pode estar indisponível ou o link pode não existir
          mais.
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full gap-2">
            <Link href="/explorar">
              <Home className="w-4 h-4" />
              Voltar para explorar
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
);

const GoogleDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const book = await getGoogleBookById(id);

  if (!book) return <BookNotFound />;

  return (
    <div className="space-y-8">
      <BackButton />
      <BookDetails
        id={book.id}
        title={book.volumeInfo.title ?? 'Título Indisponível'}
        author={
          book.volumeInfo.authors
            ? book.volumeInfo.authors.join(', ')
            : 'Desconhecido'
        }
        genre={
          book.volumeInfo.categories
            ? book.volumeInfo.categories[0]
            : 'Desconhecido'
        }
        imageUrl={
          book.volumeInfo.imageLinks?.thumbnail || '/img-placeholder.jpg'
        }
        totalPages={book.volumeInfo.pageCount || null}
        currentPage={null}
        rating={book.volumeInfo.averageRating || null}
        synopsis={book.volumeInfo.description || null}
        startDate={null}
        endDate={null}
        comment={null}
        buyLink={book.saleInfo?.buyLink || undefined}
        publisher={book.volumeInfo.publisher || undefined}
        country={book.saleInfo?.country || undefined}
        language={book.volumeInfo.language || undefined}
      />
    </div>
  );
};

export default GoogleDetailsPage;
