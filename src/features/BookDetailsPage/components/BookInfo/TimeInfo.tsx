'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Progress } from '@/src/components/ui/progress';
import { BookType } from '@/src/data/types/books';
import { Calendar, CheckCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { InfoSection } from './InfoSection';
import { format } from 'date-fns';

type TimeInfoProps = Pick<BookType, 'startDate' | 'endDate'> & {
  progress: number | null;
};

export const TimeInfo = ({ startDate, endDate, progress }: TimeInfoProps) => {
  const pathname = usePathname();
  const isDetailsPage = pathname.includes('/detalhes/');

  const formattedStartDate = startDate ? format(startDate.toDate(), 'dd/MM/yyyy') : '--/--/----';
  const formattedEndDate = endDate ? format(endDate.toDate(), 'dd/MM/yyyy') : '--/--/----';

  if (isDetailsPage) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-muted-foreground">LINHA DO TEMPO</CardTitle>
      </CardHeader>

      <CardContent>
        <InfoSection
          label="Início"
          value={formattedStartDate}
          icon={<Calendar className="text-muted-foreground w-5 h-5" />}
        />

        <InfoSection
          label="Término"
          value={formattedEndDate}
          icon={<CheckCircle className="text-muted-foreground w-5 h-5" />}
        />
      </CardContent>

      {progress && (
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex justify-between w-full">
            <span className="text-sm text-muted-foreground">Progresso</span>
            <span className="text-primary font-semibold text-sm">{progress}%</span>
          </div>

          <Progress value={progress} />
        </CardFooter>
      )}
    </Card>
  );
};
