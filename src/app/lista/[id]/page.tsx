"use client";
import { Button } from "@/src/components/ui/button";
import { getListById } from "@/src/services/firebase/lists/getListById";
import { keys } from "@/src/services/keys";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const ListDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data: list } = useQuery({
    queryKey: [keys.queryKeys.listId, id],
    queryFn: () => getListById(id),
    enabled: !!id,
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
          <Button variant="outline" className="rounded-full w-12 h-12">
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

      <main>
        <h1 className="text-2xl font-bold">{list.name}</h1>
      </main>
    </div>
  );
};

export default ListDetailsPage;
