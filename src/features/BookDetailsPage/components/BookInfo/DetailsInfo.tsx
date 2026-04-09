import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { BookType } from '@/src/data/types/books';

type DetailsInfoProps = Pick<BookType, 'currentPage' | 'totalPages' | 'genre'>;

export const DetailsInfo = ({ currentPage, totalPages, genre }: DetailsInfoProps) => {
  if (!currentPage && !totalPages && !genre) return null;

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>DETALHES</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between gap-2">
        {genre && (
          <div>
            <p className="text-muted-foreground">GÊNERO</p>
            <p className="font-bold line-clamp-1">{genre}</p>
          </div>
        )}

        {(currentPage || totalPages) && (
          <div>
            <p className="text-muted-foreground">PÁGINAS</p>
            <p className="font-bold">{currentPage !== null ? `${currentPage}/${totalPages}` : totalPages}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
