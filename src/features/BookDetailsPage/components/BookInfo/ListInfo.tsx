import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ListType } from "@/src/data/types/books";
import { Plus } from "lucide-react";
import Link from "next/link";

type ListInfoProps = {
  lists: ListType[] | undefined;
  setOpenDrawer: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
};

export const ListInfo = ({
  lists,
  setOpenDrawer,
  setOpenModal,
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
          <Link key={list.id} href={`/list/${list.id}`}>
            <Button variant="outline">{list.name}</Button>
          </Link>
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
