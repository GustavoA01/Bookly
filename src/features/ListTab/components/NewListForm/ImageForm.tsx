import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { ListFormType } from '@/src/data/schemas';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

type ImageFormProps = {
  register: UseFormRegister<ListFormType>;
  setValue: UseFormSetValue<ListFormType>;
  choosedFile: string | undefined;
  setChoosedFile: (file: string | undefined) => void;
  showImage: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageError: () => void;
};

export const ImageForm = ({
  register,
  setValue,
  choosedFile,
  setChoosedFile,
  showImage,
  handleFileChange,
  handleImageError,
}: ImageFormProps) => (
  <div className="flex flex-col gap-4">
    <Label>Selecionar Imagem</Label>
    <Input
      {...register('imageUrl')}
      placeholder="Ex: https://..."
      onChange={(e) => {
        const value = e.target.value;
        register('imageUrl').onChange(e);
        if (value) setValue('imageFile', undefined);
        if (value.startsWith('http')) setChoosedFile(value);
        else if (choosedFile) setChoosedFile(undefined);
      }}
    />

    <label
      htmlFor="select-image"
      className="flex items-center justify-center border rounded-xl bg-card p-4 h-auto cursor-pointer"
    >
      <Input
        id="select-image"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

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
          <ImageUp size={18} className="cursor-pointer text-muted-foreground" />
        </div>
      )}
    </label>
  </div>
);
