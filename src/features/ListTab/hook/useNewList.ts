import { ListFormType, listSchema } from "@/src/data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useNewList = () => {
  const methods = useForm<ListFormType>({
    resolver: zodResolver(listSchema),
  });
  const { setValue } = methods;
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
    }, 3000);
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

  const handleCreateList = (data: ListFormType) => {
    if (data.imageUrl) {
      setValue("imageFile", undefined);
      setChoosedFile(data.imageUrl);
    }
    console.log(data);
  };

  return {
    choosedFile,
    setChoosedFile,
    handleFileChange,
    showImage,
    handleImageError,
    chooseImageError,
    cleanCurrentImage,
    register: methods.register,
    handleSubmit: methods.handleSubmit,
    handleCreateList,
    setValue,
  };
};
