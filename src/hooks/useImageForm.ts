import { BookFormType, ListFormType } from '@/src/data/schemas';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

type UseImageFormProps = UseFormSetValue<BookFormType | ListFormType>;

export const useImageForm = (setValue: UseImageFormProps) => {
  const [choosedFile, setChoosedFile] = useState<string | undefined>(undefined);
  const [chooseImageError, setChooseImageError] = useState<string | null>(null);
  const showImage =
    choosedFile &&
    (choosedFile.startsWith('http') || choosedFile.startsWith('blob:')) &&
    choosedFile.length > 10;

  useEffect(() => {
    return () => {
      if (choosedFile) URL.revokeObjectURL(choosedFile);
    };
  }, [choosedFile]);

  const cleanCurrentImage = () => {
    setValue('imageUrl', '');
    setValue('imageFile', undefined);
    setChoosedFile(undefined);
  };

  const handleImageError = () => {
    setChooseImageError('Erro ao carregar a imagem');
    setChoosedFile(undefined);
    setTimeout(() => {
      setChooseImageError(null);
    }, 5000);
  };

  const uploadImageToCloudinary = async (file: File) => {
    const cloudName = 'dbyal02d7';
    const uploadPreset = 'bookly_images';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Ocorreu um erro:', errorData);
        throw new Error(
          errorData.error?.message || 'Erro na resposta do Cloudinary'
        );
      }

      const data = await response.json();

      return data.secure_url;
    } catch (error) {
      console.error('Erro ao enviar para o Cloudinary:', error);
      throw new Error('Falha no upload da imagem');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);

      setValue('imageUrl', '');
      setValue('imageFile', file);
      setChoosedFile(fileURL);
    }
  };

  return {
    choosedFile,
    setChoosedFile,
    chooseImageError,
    showImage,
    cleanCurrentImage,
    handleImageError,
    handleFileChange,
    uploadImageToCloudinary,
  };
};
