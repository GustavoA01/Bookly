import { Card } from '@/src/components/ui/card';
import { DialogTrigger } from '@/src/components/ui/dialog';
import { Plus } from 'lucide-react';
import { DialogListTriggerProps } from '../types';

export const DialogListTrigger = ({ onClick }: DialogListTriggerProps) => (
  <DialogTrigger onClick={onClick} asChild>
    <Card className="flex h-auto group bg-transparent hover:border-primary border-dashed cursor-pointer transition-all duration-250">
      <div className="m-auto flex flex-col items-center text-muted-foreground text-sm space-y-2">
        <Plus className="group-hover:text-primary transition-all duration-250" />
        <p className="group-hover:text-primary transition-all duration-250 font-montserrat">
          Criar Nova Lista
        </p>
      </div>
    </Card>
  </DialogTrigger>
);
