import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ListType } from "@/src/data/types/books";
import { Plus } from "lucide-react";
import { ListOptions } from "./ListOptions";

type ListInfoProps = {
  lists: ListType[] | undefined;
  setOpenDrawer: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
  setOpenRemoveBookModal: (open: boolean) => void;
  setListIdToRemove: (id: string) => void;
};

export const ListInfo = ({
  lists,
  setOpenDrawer,
  setOpenModal,
  setOpenRemoveBookModal,
  setListIdToRemove,
}: ListInfoProps) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-muted-foreground">
        {lists ? (
          <p>PRESENTE EM</p>
        ) : (
          <p>Este livro não está presente em nenhuma lista</p>
        )}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex gap-2 flex-wrap">
      {lists &&
        lists.map((list) => (
          <DropdownMenu dir="rtl" key={list.id}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{list.name}</Button>
            </DropdownMenuTrigger>
            <ListOptions
              listId={list.id}
              setListIdToRemove={setListIdToRemove}
              setOpenRemoveBookModal={setOpenRemoveBookModal}
            />
          </DropdownMenu>
        ))}

      <Button className="sm:hidden" onClick={() => setOpenDrawer(true)}>
        <Plus /> Adicionar à lista
      </Button>

      <Button className="hidden sm:flex" onClick={() => setOpenModal(true)}>
        <Plus /> Adicionar à lista
      </Button>
    </CardContent>
  </Card>
);
