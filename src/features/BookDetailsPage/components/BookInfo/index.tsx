import { Info as InfoIcon } from "lucide-react";
import { TimeInfo } from "./TimeInfo";
import { DetailsInfo } from "./DetailsInfo";
import { ListInfo } from "./ListInfo";

export const BookInfo = () => (
  <div className="col-span-1">
    <section className="space-y-4 max-sm:mt-4">
      <div className="flex items-center gap-2">
        <InfoIcon className="text-primary" />
        <h1 className="font-montserrat text-xl font-bold">Informaçõs</h1>
      </div>

      <TimeInfo />
      <ListInfo />
      <DetailsInfo />
    </section>
  </div>
);
