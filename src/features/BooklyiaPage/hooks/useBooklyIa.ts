import { chatSchema } from "@/src/data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChatMutation } from "./useChatMutation";
import { useEffect } from "react";
import { useAuth } from "@/src/data/contexts/AuthProvider";
import { useRouter } from "next/navigation";

export const useBooklyIa = () => {
  const { user } = useAuth();
  const { push } = useRouter();
  const { register, handleSubmit, reset } = useForm<{ prompt: string }>({
    resolver: zodResolver(chatSchema),
  });
  useEffect(() => {
    if (!user) push("/login");
  }, [user, push]);

  const {
    chat,
    userMessage,
    setUserMessage,
    suggestions,
    searchBooks,
    isRequestPending,
    isChatPending,
  } = useChatMutation();

  const handleSearch = async (data: { prompt: string }) => {
    try {
      reset({ prompt: "" });
      setUserMessage(data.prompt);
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
    userMessage,
    chat,
    isChatPending,
  };
};
