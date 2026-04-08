import { chatSchema } from "@/src/data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChatMutation } from "./useChatMutation";
import { useEffect } from "react";
import { useAuth } from "@/src/data/contexts/AuthProvider";
import { useRouter } from "next/navigation";

export const useBooklyIa = () => {
  const { user, isLoading } = useAuth();
  const { push } = useRouter();
  const { register, handleSubmit, reset } = useForm<{ prompt: string }>({
    resolver: zodResolver(chatSchema),
  });

  useEffect(() => {
    if (!user && !isLoading) push("/login");
  }, [user, isLoading, push]);

  const {
    chat,
    userTemporaryMessage,
    setUserTemporaryMessage,
    suggestions,
    searchBooks,
    isRequestPending,
    isChatPending,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deleteChatFn,
    isDeletingChat,
  } = useChatMutation();

  const handleSearch = async (data: { prompt: string }) => {
    try {
      reset({ prompt: "" });
      setUserTemporaryMessage(data.prompt);
      await searchBooks(data.prompt);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return {
    handleSearch,
    register,
    handleSubmit,
    isRequestPending,
    suggestions: suggestions.length === 0 ? chat?.suggestions : suggestions,
    userTemporaryMessage,
    chat,
    isChatPending,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deleteChatFn,
    isDeletingChat,
  };
};
