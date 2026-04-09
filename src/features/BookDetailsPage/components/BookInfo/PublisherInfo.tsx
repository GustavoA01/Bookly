import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { BookText, Earth, Languages } from 'lucide-react';
import { InfoSection } from './InfoSection';

type PublisherInfoProps = {
  publisher?: string;
  country?: string;
  language?: string;
};

export const PublisherInfo = ({ publisher, country, language }: PublisherInfoProps) => {
  if (!publisher && !country && !language) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-muted-foreground">PUBLICAÇÃO</CardTitle>
      </CardHeader>

      <CardContent>
        {publisher && (
          <InfoSection
            label="EDITORA"
            value={publisher}
            icon={<BookText className="text-muted-foreground w-5 h-5" />}
          />
        )}

        {country && (
          <InfoSection label="PAÍS" value={country} icon={<Earth className="text-muted-foreground w-5 h-5" />} />
        )}

        {language && (
          <InfoSection label="IDIOMA" value={language} icon={<Languages className="text-muted-foreground w-5 h-5" />} />
        )}
      </CardContent>
    </Card>
  );
};
