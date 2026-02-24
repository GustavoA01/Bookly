import { ListFormType, listSchema } from "@/src/data/schemas";
import { useImageForm } from "@/src/hooks/useImageForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useNewList = () => {
  const methods = useForm<ListFormType>({
    resolver: zodResolver(listSchema),
  });
  const { setValue } = methods;

  const {
    choosedFile,
    setChoosedFile,
    chooseImageError,
    showImage,
    cleanCurrentImage,
    handleImageError,
    handleFileChange,
  } = useImageForm(setValue);

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
    handleCreateList,
    methods,
  };
};
