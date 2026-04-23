import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import Image from 'next/image';
import { AuthHeaderProps } from '../types';

export const AuthHeader = ({ title, description }: AuthHeaderProps) => (
  <CardHeader className="text-center">
    <Image
      src="/opengraph-image.png"
      width={120}
      height={120}
      alt="Logo Bookly"
      className="m-auto rounded-lg"
    />
    <CardTitle className="text-2xl font-bold">{title}</CardTitle>
    <CardDescription className="font-montserrat">{description}</CardDescription>
  </CardHeader>
);
