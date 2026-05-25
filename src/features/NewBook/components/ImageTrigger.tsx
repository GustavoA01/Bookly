import { Card } from '@/src/components/ui/card';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { ImageTriggerProps } from '../types';

export const ImageTrigger = ({
  showImage,
  choosedFile,
  handleImageError,
}: ImageTriggerProps) => (
  <Card className="h-auto w-full border border-dashed bg-transparent cursor-pointer hover:border-primary transition-all duration-250">
    <div className="flex flex-col m-auto items-center justify-center gap-2 text-muted-foreground">
      {showImage ? (
        <Image
          src={choosedFile!}
          alt="Preview"
          width={200}
          height={300}
          onError={handleImageError}
          className="rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <ImageUp />
          <p>Escolher imagem do livro</p>
        </div>
      )}
    </div>
  </Card>
);
