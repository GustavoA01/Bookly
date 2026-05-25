'use client';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { useRouter } from 'next/navigation';
import { ListCardProps } from '../types';

export const ListCard = ({ id, name, itemCount }: ListCardProps) => {
  const { push } = useRouter();
  const descriptionText =
    itemCount === 0
      ? 'Nenhum livro'
      : itemCount === 1
        ? '1 livro'
        : `${itemCount} livros`;

  return (
    <Card
      onClick={() => push(`/lista/${id}`)}
      className="cursor-pointer hover:bg-accent/50 hover:border-primary transition-all duration-250"
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{descriptionText}</CardDescription>
      </CardHeader>
    </Card>
  );
};
