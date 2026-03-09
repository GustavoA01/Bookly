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
    uploadImageToCloudinary,
  } = useImageForm(setValue);

  const { createListFn, updateListFn } = useListMutation();

  const handleUpdateList = async (
    data: ListFormType,
    finalImageUrl: string | null,
  ) => {
    if (!list || !user) return;
    const updatedList: Pick<ListType, "name" | "description" | "imageUrl"> = {
      name: data.name,
      description: data.description || null,
      imageUrl: finalImageUrl,
    };

    await updateListFn({ list: updatedList, listId: list.id, user });
  };

  const handleCreateList = async (data: ListFormType) => {
    if (!user) return;

    let finalImageUrl = data.imageUrl || null;

    if (data.imageFile) {
      try {
        finalImageUrl = await uploadImageToCloudinary(data.imageFile);
      } catch (error) {
        console.error("Erro no upload da imagem:", error);
        return;
      }
    }

    if (list) {
      handleUpdateList(data, finalImageUrl);
      return;
    }

    const newList: Omit<ListType, "id"> = {
      name: data.name,
      description: data.description || null,
      imageUrl: finalImageUrl,
      createdAt: Timestamp.now(),
      books: [],
      userId: user.uid,
    };

    await createListFn(newList);
  };

  const submitForm = handleCreateList;

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
