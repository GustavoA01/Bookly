'use client';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const { back } = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => back()}
      data-testid="back-button"
      className="rounded-full w-12 h-12"
    >
      <ArrowLeft className="w-auto h-auto" />
    </Button>
  );
};
