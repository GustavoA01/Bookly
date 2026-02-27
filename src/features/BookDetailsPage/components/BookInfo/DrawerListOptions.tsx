import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";
import Link from "next/link";

type DrawerListOptionsProps = {
  listId: string;
  listName: string;
  setOpenOptionsDrawer: (open: boolean) => void;
  setOpenRemoveBookModal: (open: boolean) => void;
  setListIdToRemove: (id: string) => void;
};

export const DrawerListOptions = ({
  listId,
  listName,
  setOpenOptionsDrawer,
  setOpenRemoveBookModal,
  setListIdToRemove,
}: DrawerListOptionsProps) => (
  <DrawerContent className="pb-8">
    <DrawerHeader>
      <DrawerTitle>{listName}</DrawerTitle>
    </DrawerHeader>
    <div className="px-4 flex flex-col gap-2 text-lg">
      <Link className="bg-blue-500/10 rounded-lg p-3" href={`/lista/${listId}`}>
        Ir para lista
      </Link>
      <p
        onClick={() => {
          setOpenOptionsDrawer(false);
          setOpenRemoveBookModal(true);
          setListIdToRemove(listId);
        }}
        className="bg-red-500/10 rounded-lg p-3"
      >
        Remover
      </p>
    </div>
  </DrawerContent>
);
