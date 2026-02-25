import { ListFormType, listSchema } from "@/src/data/schemas";
import { ListType } from "@/src/data/types/books";
import { useImageForm } from "@/src/hooks/useImageForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useListMutation } from "./useListMutation";
import { useAuth } from "@/src/contexts/AuthProvider";

export const useNewList = () => {
  const { user } = useAuth();
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

  const { createListFn } = useListMutation();

  const handleCreateList = async (data: ListFormType) => {
    if (!user) return;
    if (data.imageUrl) {
      setValue("imageFile", undefined);
      setChoosedFile(data.imageUrl);
    }

    const newList: Omit<ListType, "id"> = {
      name: data.name,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
      createdAt: Timestamp.now(),
      books: [],
      userId: user.uid,
    };

    console.log(newList);
    await createListFn(newList);
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
