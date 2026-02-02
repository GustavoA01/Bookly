import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Plus } from "lucide-react";

export const ListInfo = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-muted-foreground">
        PRESENTE EM
        {/* Este livro não está presente em nenhuma lista */}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-x-2 space-y-2">
      <Button variant="secondary">Favoritos</Button>

      <Button>
        <Plus /> Add
      </Button>
    </CardContent>
  </Card>
);
