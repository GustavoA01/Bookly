"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

type ListInfoProps = {
  lists:
    | {
        id: string;
        name: string;
      }[]
    | null;
};

export const ListInfo = ({ lists }: ListInfoProps) => {
  const pathname = usePathname();
  const isDetails = pathname.includes("/detalhes/");

  if (isDetails) return null;

  return (
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
      <CardContent className="space-x-2 space-y-2">
        {lists &&
          lists.map((list) => (
            <Button key={list.id} variant="outline">
              {list.name}
            </Button>
          ))}

        <Button>
          <Plus /> Add
        </Button>
      </CardContent>
    </Card>
  );
};
