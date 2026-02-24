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
  } = useImageForm(setValue);

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
