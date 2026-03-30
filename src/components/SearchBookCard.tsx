"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Plus, Star } from "lucide-react";
import { BookType } from "../data/types/books";

type SearchBookCardProps = Pick<
  BookType,
  "id" | "title" | "author" | "genre" | "imageUrl" | "rating"
>;

export const SearchBookCard = ({
  id,
  title,
  rating,
  author,
  genre,
  imageUrl,
}: SearchBookCardProps) => (
  <div className="group flex flex-col select-none cursor-pointer gap-3">
    <div className="flex justify-center relative aspect-2/3 w-full overflow-hidden group-hover:-translate-y-1.5 transition-all duration-300 rounded-md">
      <Image
        src={imageUrl!}
        alt={`Capa do livro ${title}`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
        className="object-cover group-hover:opacity-75 transition-opacity"
      />

      <Link
        href={`/detalhes/${id}`}
        className="absolute inset-0 z-10"
        title={`Ver detalhes de ${title}`}
      />

      <Link
        href={`/novo-livro?id=${id}&role=google`}
        title={`Adicionar ${title} à biblioteca`}
        className="w-[80%] absolute z-20 bottom-5 m-auto opacity-0 group-hover:opacity-100 bg-accent-foreground hover:bg-primary transition-all duration-300 rounded-md"
      >
        <Button className="w-full bg-accent-foreground hover:bg-primary transition-all duration-300">
          <Plus />
          <p>Adicionar</p>
        </Button>
      </Link>
    </div>

    <section className="flex flex-col gap-1">
      <h3 className="font-semibold group-hover:text-primary transition-all duration-300 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{author}</p>

      <div className="hidden sm:flex items-center gap-2">
        {rating && (
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-5 h-auto fill-green-500 text-green-500" />
            <p>{rating}</p>
          </div>
        )}

        {genre && (
          <div className="bg-primary/10 text-xs py-1 px-2 rounded">{genre}</div>
        )}
      </div>
    </section>
  </div>
);
