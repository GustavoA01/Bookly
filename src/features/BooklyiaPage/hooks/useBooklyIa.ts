import { chatSchema } from "@/src/data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChatMutation } from "./useChatMutation";

export const useBooklyIa = () => {
  const { register, handleSubmit, reset } = useForm<{ prompt: string }>({
    resolver: zodResolver(chatSchema),
  });
  const {
    chat,
    userMessage,
    setUserMessage,
    suggestions,
    searchBooks,
    isPending,
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
    isPending,
    suggestions,
    userMessage,
    chat,
  };
};
