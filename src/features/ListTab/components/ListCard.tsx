import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export const ListCard = () => {
  return (
    <Card className="cursor-pointer hover:bg-accent/50 hover:border-primary transition-all duration-250">
      <CardHeader>
        <CardTitle>Favoritos</CardTitle>
        <CardDescription>2 livros</CardDescription>
      </CardHeader>
    </Card>
  );
};
