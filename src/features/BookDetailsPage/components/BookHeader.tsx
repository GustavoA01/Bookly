import { Badge } from "@/src/components/ui/badge";
import { BookType } from "@/src/data/types/books";
import { BookOpen, Star } from "lucide-react";

type BookHeaderProps = Pick<
  BookType,
  "title" | "author" | "status" | "rating"
> & {
  isImageNull: boolean;
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
      className={`flex flex-col items-center space-y-2 ${isImageNull ? "" : "sm:items-start"}`}
    >
      <Badge variant="outline" className="flex items-center gap-2 text-primary">
        <BookOpen className="sm:w-15 sm:h-15" />
        <p className="sm:text-base">{status}</p>
      </Badge>
      <h1 className="text-3xl sm:text-5xl font-bold font-montserrat">
        {title}
      </h1>
      <p className="text-base sm:text-2xl text-muted-foreground font-montserrat">
        {author}
      </p>
      <div className="text-muted-foreground font-montserrat flex gap-2 items-center">
        <Star className="fill-primary text-primary" />
        <p>{rating}</p>
      </div>
    </div>
  </header>
);
