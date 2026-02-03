import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

type DetailsInfoProps = {
  genre: string;
  currentPage: number;
  totalPages: number;
};

export const DetailsInfo = ({
  currentPage,
  totalPages,
  genre,
}: DetailsInfoProps) => (
  <Card>
    <CardHeader>
      <CardTitle>DETALHES</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-between">
      <div>
        <p className="text-muted-foreground">GENÊRO</p>
        <p className="font-bold">{genre}</p>
      </div>
      <div>
        <p className="text-muted-foreground">PÁGINAS</p>
        <p className="font-bold">
          {currentPage}/{totalPages}
        </p>
      </div>
    </CardContent>
  </Card>
);
