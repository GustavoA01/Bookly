import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Plus, Star } from "lucide-react";

type SearchBookCardProps = {
  title: string;
  author: string;
  imageUrl: string;
  rating: number;
  genre: string;
};

export const SearchBookCard = ({
  title,
  rating,
  author,
  genre,
  imageUrl,
}: SearchBookCardProps) => (
  <Link
    href="#"
    className="group flex flex-col select-none cursor-pointer gap-3"
  >
    <div className="relative group-hover:-translate-y-1.5 transition-all duration-300 rounded-md ">
      <Image
        src={imageUrl}
        alt={`Capa do livro ${title}`}
        width={200}
        height={300}
        className="rounded-md group-hover:opacity-75 transition-opacity"
      />

      <Button className="absolute z-20 bottom-5 left-5 opacity-0 group-hover:opacity-100 bg-accent-foreground hover:bg-primary transition-all duration-300 w-[80%]">
        <Plus />
        <p>Adicionar</p>
      </Button>
    </div>

    <section className="flex flex-col gap-1">
      <h3 className="font-semibold group-hover:text-primary transition-all duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{author}</p>

      <div className="hidden sm:flex items-center gap-2">
        <div className="flex items-center gap-1 text-xs">
          <Star className="w-5 h-auto fill-green-500 text-green-500" />
          <p>{rating}</p>
        </div>

        <div className="bg-primary/10 text-xs py-1 px-2 rounded">{genre}</div>
      </div>
    </section>
  </Link>
);
