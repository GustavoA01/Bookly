import { ListFormType, listSchema } from "@/src/data/schemas";
import { ListType } from "@/src/data/types/books";
import { useImageForm } from "@/src/hooks/useImageForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useListMutation } from "./useListMutation";
import { useAuth } from "@/src/contexts/AuthProvider";

export const useNewList = (list?: ListType) => {
  const { user } = useAuth();
  const methods = useForm<ListFormType>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: list?.name || "",
      description: list?.description || "",
      imageUrl: list?.imageUrl || undefined,
    },
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

  const { createListFn, updateListFn } = useListMutation();

  const handleUpdateList = async (data: ListFormType) => {
    if (!user || !list) return;
    if (data.imageUrl) {
      setValue("imageFile", undefined);
      setChoosedFile(data.imageUrl);
    }

    const updatedList: Pick<ListType, "name" | "description" | "imageUrl"> = {
      name: data.name,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
    };

    await updateListFn({ list: updatedList, listId: list.id, user });
  };

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

  const submitForm = list ? handleUpdateList : handleCreateList;

  return {
    choosedFile,
    setChoosedFile,
    handleFileChange,
    submitForm,
    showImage,
    handleImageError,
    chooseImageError,
    cleanCurrentImage,
    methods,
  };
};
