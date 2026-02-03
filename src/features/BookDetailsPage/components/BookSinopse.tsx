import { Card, CardContent } from "@/src/components/ui/card";
import { BookOpen, PencilLine } from "lucide-react";

type BookSinopseProps = {
  sinopse: string | null;
  comment: string | null;
};

export const BookSinopse = ({ sinopse, comment }: BookSinopseProps) => (
  <div className="col-span-2 space-y-4">
    {sinopse && (
      <section>
        <div className="flex items-center gap-2">
          <BookOpen className="text-primary" />
          <h1 className="font-montserrat text-xl font-bold">Sinopse</h1>
        </div>

        <Card className="bg-transparent border border-border mt-4 p-6">
          <CardContent className="text-muted-foreground">{sinopse}</CardContent>
        </Card>
      </section>
    )}

    {comment && (
      <section>
        <div className="flex items-center gap-2">
          <PencilLine className="text-primary" />
          <h1 className="font-montserrat text-xl font-bold">Comentário</h1>
        </div>
        <Card className="bg-transparent border border-border mt-4 p-6">
          <CardContent className="text-muted-foreground">{comment}</CardContent>
        </Card>
      </section>
    )}
  </div>
);
