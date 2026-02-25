"use client";
import { ListCard } from "@/src/features/ListTab/components/ListCard";
import { Card } from "@/src/components/ui/card";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
import { NewListForm } from "./NewListForm";
import { useQuery } from "@tanstack/react-query";
import { keys } from "@/src/services/keys";
import { getLists } from "@/src/services/firebase/lists/getLists";
import { Skeleton } from "@/src/components/ui/skeleton";

export const ListTabContent = () => {
  const { data: lists, isLoading: isListsLoading } = useQuery({
    queryKey: [keys.queryKeys.lists],
    queryFn: getLists,
  });

  return (
    <main className="sm:grid sm:grid-cols-2 md:grid-cols-3 max-sm:space-y-2 lg:grid-cols-4 gap-2 mt-2">
      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex h-auto group bg-transparent hover:border-primary border-dashed cursor-pointer transition-all duration-250">
            <div className="m-auto flex flex-col items-center text-muted-foreground text-sm space-y-2">
              <Plus className="group-hover:scale-110 transition-all duration-250 group-hover:text-primary" />
              <p className="group-hover:scale-110 transition-all duration-250 group-hover:text-primary font-montserrat">
                Criar Nova Lista
              </p>
            </div>
          </Card>
        </DialogTrigger>
        <NewListForm />
      </Dialog>

      {isListsLoading ? (
        <>
          {[...Array(7)].map((_, index) => (
            <Skeleton key={index} className="h-25 rounded-lg" />
          ))}
        </>
      ) : (
        <>
          {lists && lists.length === 0 ? (
            <div className="col-span-full flex justify-center items-center h-40">
              <p className="text-muted-foreground">
                Nenhuma lista criada ainda
              </p>
            </div>
          ) : null}
        </>
      )}

      {lists &&
        lists.map((list) => (
          <ListCard
            key={list.id}
            name={list.name}
            itemCount={list.books.length}
          />
        ))}
    </main>
  );
};
