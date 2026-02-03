import { Info as InfoIcon } from "lucide-react";
import { TimeInfo } from "./TimeInfo";
import { DetailsInfo } from "./DetailsInfo";
import { ListInfo } from "./ListInfo";

const mockLists = [
  { id: "1", name: "Favoritos" },
  { id: "2", name: "Quero Ler" },
];

export const BookInfo = () => (
  <div className="col-span-1">
    <section className="space-y-4 max-sm:mt-4">
      <div className="flex items-center gap-2">
        <InfoIcon className="text-primary" />
        <h1 className="font-montserrat text-xl font-bold">Informações</h1>
      </div>

      <TimeInfo startDate="29/02/2025" endDate="--/--/----" progress={45} />
      <ListInfo lists={mockLists} />
      <DetailsInfo currentPage={450} totalPages={1000} genre="Fantasia" />
    </section>
  </div>
);
