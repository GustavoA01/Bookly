import { BookFormType, ListFormType } from "@/src/data/schemas";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type UseImageFormProps = UseFormSetValue<BookFormType | ListFormType>;

export const useImageForm = (setValue: UseImageFormProps) => {
  const [choosedFile, setChoosedFile] = useState<string | undefined>(undefined);
  const [chooseImageError, setChooseImageError] = useState<string | null>(null);
  const showImage =
    choosedFile &&
    (choosedFile.startsWith("http") || choosedFile.startsWith("blob:")) &&
    choosedFile.length > 10;

  useEffect(() => {
    return () => {
      if (choosedFile) URL.revokeObjectURL(choosedFile);
    };
  }, [choosedFile]);

  const cleanCurrentImage = () => {
    setValue("imageUrl", "");
    setValue("imageFile", undefined);
    setChoosedFile(undefined);
  };

  const handleImageError = () => {
    setChooseImageError("Erro ao carregar a imagem");
    setChoosedFile(undefined);
    setTimeout(() => {
      setChooseImageError(null);
    }, 5000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);

      setValue("imageUrl", "");
      setValue("imageFile", file);
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
  };
};
