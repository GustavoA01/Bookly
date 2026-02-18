import { Info as InfoIcon } from "lucide-react";
import { TimeInfo } from "./TimeInfo";
import { DetailsInfo } from "./DetailsInfo";
import { ListInfo } from "./ListInfo";
import { AddBuyButton } from "../../container/AddBuyButton";
import { BookType } from "@/src/data/types/books";

type BookInfoProps = Pick<
  BookType,
  "currentPage" | "totalPages" | "startDate" | "endDate" | "genre"
> & {
  id?: string;
  isSinopseAndCommentNull: boolean;
  buyLink?: string;
};

const mockLists = [
  { id: "1", name: "Favoritos" },
  { id: "2", name: "Quero Ler" },
  { id: "3", name: "Quero Ler" },
  { id: "4", name: "Quero Ler" },
];

export const BookInfo = ({
  id,
  isSinopseAndCommentNull,
  genre,
  currentPage,
  totalPages,
  startDate,
  endDate,
  buyLink,
}: BookInfoProps) => {
  return (
    <section className="space-y-4 max-sm:mt-4 col-span-1">
      <div className="flex items-center gap-2">
        <InfoIcon className="text-primary" />
        <h1 className="font-montserrat text-xl font-bold">Informações</h1>
      </div>

      <div
        className={
          isSinopseAndCommentNull
            ? "gap-4 flex max-sm:flex-col justify-between"
            : "flex flex-col space-y-6"
        }
      >
        <TimeInfo startDate={startDate} endDate={endDate} progress={45} />
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
