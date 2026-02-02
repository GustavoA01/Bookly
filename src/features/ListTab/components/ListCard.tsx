import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

type ListCardProps = {
  name: string;
  itemCount: number;
};

export const ListCard = ({ name, itemCount }: ListCardProps) => {
  return (
    <Card className="cursor-pointer hover:bg-accent/50 hover:border-primary transition-all duration-250">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{itemCount} livros</CardDescription>
      </CardHeader>
    </Card>
  );
};
