"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useRouter } from "next/navigation";

type ListCardProps = {
  id: string;
  name: string;
  itemCount: number;
};

export const ListCard = ({ id, name, itemCount }: ListCardProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/lista/${id}`)}
      className="cursor-pointer hover:bg-accent/50 hover:border-primary transition-all duration-250"
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{itemCount} livros</CardDescription>
      </CardHeader>
    </Card>
  );
};
