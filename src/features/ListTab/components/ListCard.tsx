'use client';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { useRouter } from 'next/navigation';

type ListCardProps = {
  id: string;
  name: string;
  itemCount: number;
};

export const ListCard = ({ id, name, itemCount }: ListCardProps) => {
  const router = useRouter();
  const descriptionText =
    itemCount === 0
      ? 'Nenhum livro'
      : itemCount === 1
        ? '1 livro'
        : `${itemCount} livros`;

  return (
    <Card
      onClick={() => router.push(`/lista/${id}`)}
      className="cursor-pointer hover:bg-accent/50 hover:border-primary transition-all duration-250"
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{descriptionText}</CardDescription>
      </CardHeader>
    </Card>
  );
};
