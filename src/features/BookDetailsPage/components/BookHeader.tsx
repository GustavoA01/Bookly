import { StatusChip } from '@/src/components/StatusChip';
import { BookType, Status } from '@/src/data/types/books';
import { Star } from 'lucide-react';

type BookHeaderProps = Pick<BookType, 'title' | 'author' | 'rating'> & {
  isImageNull: boolean;
  status?: Status;
};

export const BookHeader = ({
  title,
  author,
  isImageNull,
  status,
  rating,
}: BookHeaderProps) => (
  <header className="my-auto">
    <div
      className={`flex flex-col items-center space-y-2 ${isImageNull ? '' : 'sm:items-start'}`}
    >
      {status && (
        <StatusChip className="rounded-full text-sm" status={status} />
      )}

      <h1 className="text-3xl sm:text-5xl font-bold font-montserrat max-w-lg text-center sm:text-left">
        {title}
      </h1>
      <p className="text-base sm:text-2xl text-muted-foreground font-montserrat max-w-lg">
        {author}
      </p>

      {rating && (
        <div className="text-muted-foreground font-montserrat flex gap-2 items-center">
          <Star className="fill-primary text-primary" />
          <p>{rating}</p>
        </div>
      )}
    </div>
  </header>
);
