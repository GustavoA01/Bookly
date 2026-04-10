import Image from 'next/image';

type ListInfoProps = {
  imageUrl: string | null;
  name: string;
  description: string | null;
  date: string;
};

export const ListInfo = ({
  imageUrl,
  name,
  description,
  date,
}: ListInfoProps) => (
  <div className="flex flex-col max-sm:space-y-4 sm:flex-row justify-center sm:items-center sm:space-x-4">
    {imageUrl && (
      <div>
        <Image
          src={imageUrl}
          alt={`Imagem de ${name}`}
          width={200}
          height={200}
          className="rounded-md m-auto"
        />
      </div>
    )}
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-center">{name}</h1>
      <h2 className="text-muted-foreground text-center">{description}</h2>
      <h3 className="text-muted-foreground text-center">{date}</h3>
    </div>
  </div>
);
