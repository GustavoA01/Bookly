"use client";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { Info as InfoIcon } from "lucide-react";
import { TimeInfo } from "./TimeInfo";
import { DetailsInfo } from "./DetailsInfo";
import { ListInfo } from "./ListInfo";
import { AddBuyButton } from "../../container/AddBuyButton";
import { BookType } from "@/src/data/types/books";
import { PublisherInfo } from "./PublisherInfo";
import { Drawer, DrawerContent, DrawerTitle } from "@/src/components/ui/drawer";
import { AddListContent } from "../../container/AddListContent";
import { useBookInfo } from "../../hooks/useBookInfo";
import { RemoveListModal } from "../RemoveModal";

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
  const {
    isBooksDetailsPage,
    listsContainingBook,
    progress,
    openDrawer,
    openModal,
    setOpenDrawer,
    setOpenModal,
    openRemoveBookModal,
    setOpenRemoveBookModal,
    deleteListFn,
    setListIdToRemove,
    openOptionsDrawer,
    setOpenOptionsDrawer,
  } = useBookInfo(id!, currentPage, totalPages);

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
            setOpenRemoveBookModal={setOpenRemoveBookModal}
            setListIdToRemove={setListIdToRemove}
            setOpenOptionsDrawer={setOpenOptionsDrawer}
            openOptionsDrawer={openOptionsDrawer}
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

      <Dialog open={openRemoveBookModal} onOpenChange={setOpenRemoveBookModal}>
        <RemoveListModal removeFn={deleteListFn} />
      </Dialog>
    </section>
  );
};
