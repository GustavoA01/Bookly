import { Button } from '@/src/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const DoLoginCard = () => (
  <div className="text-center mt-10 space-y-4 animate-fade-in-title">
    <p className="text-lg text-muted-foreground">
      Faça login para acessar os recursos da IA.
    </p>
    <Link href="/login">
      <Button>
        <p>Ir para login</p>
        <ArrowRight />
      </Button>
    </Link>
  </div>
);
