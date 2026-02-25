"use client";
import { Info as InfoIcon } from "lucide-react";
import { TimeInfo } from "./TimeInfo";
import { DetailsInfo } from "./DetailsInfo";
import { ListInfo } from "./ListInfo";
import { AddBuyButton } from "../../container/AddBuyButton";
import { BookType } from "@/src/data/types/books";
import { PublisherInfo } from "./PublisherInfo";
import { keys } from "@/src/services/keys";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/src/components/ui/drawer";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { AddListContent } from "../../container/AddListContent";
import { auth } from "@/src/services/firebase/firebaseConfig";
import { getListsContainingBook } from "@/src/services/firebase/lists/getListsConteinsBooks";

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
  const pathname = usePathname();
  const isBooksDetailsPage = pathname.includes("/livro/");
  const user = auth.currentUser;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data: listsContainingBook } = useQuery({
    queryKey: [keys.queryKeys.lists, id],
    queryFn: () => getListsContainingBook(id!, user!.uid),
    enabled: isBooksDetailsPage,
  });

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
        {isBooksDetailsPage && (
          <ListInfo
            lists={listsContainingBook}
            setOpenDrawer={setOpenDrawer}
            setOpenModal={setOpenModal}
          />
        )}
        <AddBuyButton id={id} buyLink={buyLink} />
      </div>

      <Drawer direction="bottom" open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="px-4 space-y-4 pb-5">
          <DrawerTitle>Adicionar à lista</DrawerTitle>
          <AddListContent id={id} open={openDrawer} setOpen={setOpenDrawer} />
        </DrawerContent>
      </Drawer>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogTitle>Adicionar à lista</DialogTitle>
          <AddListContent id={id} open={openModal} setOpen={setOpenModal} />
        </DialogContent>
      </Dialog>
    </section>
  );
};
