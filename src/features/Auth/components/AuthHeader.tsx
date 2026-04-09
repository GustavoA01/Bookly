import { CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import Image from 'next/image';

type AuthHeaderProps = {
  title: string;
  description: string;
};

export const AuthHeader = ({ title, description }: AuthHeaderProps) => (
  <CardHeader className="text-center">
    <Image src="/opengraph-image.png" className="m-auto rounded-lg" alt="Logo Bookly" width={120} height={120} />
    <CardTitle className="text-2xl font-bold">{title}</CardTitle>
    <CardDescription className=" font-montserrat">{description}</CardDescription>
  </CardHeader>
);
