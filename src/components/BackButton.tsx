'use client';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const { back } = useRouter();

  return (
    <Button
      data-testid="back-button"
      variant="outline"
      onClick={() => back()}
      className="rounded-full w-12 h-12"
    >
      <ArrowLeft className="w-auto h-auto" />
    </Button>
  );
};
