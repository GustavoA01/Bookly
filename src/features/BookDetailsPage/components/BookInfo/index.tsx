import { Info as InfoIcon } from "lucide-react";
import { TimeInfo } from "./TimeInfo";
import { DetailsInfo } from "./DetailsInfo";
import { ListInfo } from "./ListInfo";
import { AddBuyButton } from "../../container/AddBuyButton";

type BookInfoProps = {
  isSinopseAndCommentNull: boolean;
};

const mockLists = [
  { id: "1", name: "Favoritos" },
  { id: "2", name: "Quero Ler" },
  { id: "3", name: "Quero Ler" },
  { id: "4", name: "Quero Ler" },
];

export const BookInfo = ({ isSinopseAndCommentNull }: BookInfoProps) => {
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
        <TimeInfo startDate="29/02/2025" endDate="--/--/----" progress={45} />
        <DetailsInfo currentPage={450} totalPages={1000} genre="Fantasia" />
        <ListInfo lists={mockLists} />
        <AddBuyButton />
      </div>
    </section>
  );
};
