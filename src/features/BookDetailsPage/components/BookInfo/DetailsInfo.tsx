import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export const DetailsInfo = () => (
  <Card>
    <CardHeader>
      <CardTitle>DETALHES</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-between">
      <div>
        <p className="text-muted-foreground">GENÊRO</p>
        <p className="font-bold">Fantasia</p>
      </div>
      <div>
        <p className="text-muted-foreground">PÁGINAS</p>
        <p className="font-bold">1000</p>
      </div>
    </CardContent>
  </Card>
);
