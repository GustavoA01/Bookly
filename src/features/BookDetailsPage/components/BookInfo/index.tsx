import { Info as InfoIcon } from "lucide-react";
import { TimeInfo } from "./TimeInfo";
import { DetailsInfo } from "./DetailsInfo";
import { ListInfo } from "./ListInfo";
import { AddBuyButton } from "../../container/AddBuyButton";
import { BookType } from "@/src/data/types/books";
import { PublisherInfo } from "./PublisherInfo";

type BookInfoProps = Pick<
  BookType,
  "currentPage" | "totalPages" | "startDate" | "endDate" | "genre"
> & {
  id?: string;
  isSynopsisAndCommentNull: boolean;
  buyLink?: string;
  publisher?: string;
  country?: string;
  language?: string;
};

const mockLists = [
  { id: "1", name: "Favoritos" },
  { id: "2", name: "Quero Ler" },
  { id: "3", name: "Quero Ler" },
  { id: "4", name: "Quero Ler" },
];

export const BookInfo = ({
  id,
  isSynopsisAndCommentNull,
  genre,
  currentPage,
  totalPages,
  startDate,
  endDate,
  buyLink,
  publisher,
  country,
  language,
}: BookInfoProps) => {
  const progress =
    currentPage && totalPages
      ? Math.floor((currentPage * 100) / totalPages)
      : null;
  return (
    <section className="space-y-4 max-sm:mt-4 col-span-1">
      <div className="flex items-center gap-2">
        <InfoIcon className="text-primary" />
        <h1 className="font-montserrat text-xl font-bold">Informações</h1>
      </div>

      <div
        className={
          isSynopsisAndCommentNull
            ? "gap-4 flex max-sm:flex-col justify-between"
            : "flex flex-col space-y-6"
        }
      >
        <TimeInfo startDate={startDate} endDate={endDate} progress={progress} />
        <PublisherInfo
          publisher={publisher}
          country={country}
          language={language}
        />
        <DetailsInfo
          currentPage={currentPage}
          totalPages={totalPages}
          genre={genre}
        />
        <ListInfo lists={mockLists} />
        <AddBuyButton id={id} buyLink={buyLink} />
      </div>
    </section>
  );
};
