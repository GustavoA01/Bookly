"use client";
import { Button } from "@/src/components/ui/button";
import { Dialog } from "@/src/components/ui/dialog";
import { BookTable } from "@/src/features/BookTable/container";
import { NewListForm } from "@/src/features/ListTab/container/NewListForm";
import { getBooksFromList } from "@/src/services/firebase/books/getBooksFromList";
import { getListById } from "@/src/services/firebase/lists/getListById";
import { keys } from "@/src/services/keys";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

const ListDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { data: list } = useQuery({
    queryKey: [keys.queryKeys.listId, id],
    queryFn: () => getListById(id),
    enabled: !!id,
  });

  const booksExists = !!list?.books && list.books.length > 0;

  const { data: books, isLoading: isBooksLoading } = useQuery({
    queryKey: [keys.queryKeys.listId, id, keys.queryKeys.books],
    queryFn: () => getBooksFromList(list!.books),
    enabled: booksExists,
  });

  if (!list) return null;

  return (
    <div>
      <header className="flex justify-between items-center">
        <Link href="/?tab=lists" replace>
          <Button
            data-testid="back-button"
            variant="outline"
            className="rounded-full w-12 h-12"
          >
            <ArrowLeft className="w-auto h-auto" />
          </Button>
        </Link>

        <div className="flex space-x-4">
          <Button
            onClick={() => setOpenEditModal(true)}
            variant="outline"
            className="rounded-full w-12 h-12"
          >
            <Pencil className="w-auto h-auto" />
          </Button>
          <Button
            data-testid="delete-button"
            variant="outline"
            className="rounded-full w-12 h-12"
            // onClick={() => setOpenDeleteDialog(true)}
          >
            <Trash className="w-auto h-auto" />
          </Button>
        </div>
      </header>

      <main className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-center">{list.name}</h1>
          <h2 className="text-muted-foreground text-center">
            {list.description}
          </h2>
          <h3 className="text-muted-foreground text-center">
            {format(list.createdAt.toDate(), "dd/MM/yyyy")}
          </h3>
        </div>

        <BookTable books={books} isBooksLoading={isBooksLoading} />
      </main>

      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <NewListForm list={list} />
      </Dialog>
    </div>
  );
};

export default ListDetailsPage;
