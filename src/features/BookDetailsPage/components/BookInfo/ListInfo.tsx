import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Plus } from "lucide-react";

type ListInfoProps = {
  lists:
    | {
        id: string;
        name: string;
      }[]
    | null;
};

export const ListInfo = ({ lists }: ListInfoProps) => (
  <Card className="w-full max-w-sm">
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
