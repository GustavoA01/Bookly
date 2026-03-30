import { useAuth } from "@/src/contexts/AuthProvider";
import { chatSchema } from "@/src/data/schemas";
import { SuggestionsResponseType } from "@/src/data/types/api";
import { getBooks } from "@/src/services/firebase/books/getBooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useBooklyIa = () => {
  const { register, handleSubmit, reset } = useForm<{ prompt: string }>({
    resolver: zodResolver(chatSchema),
  });
  const [userMessage, setUserMessage] = useState<string>("");
  const { user } = useAuth();

  const {
    data,
    mutateAsync: searchBooks,
    isPending,
  } = useMutation({
    mutationKey: ["suggestions"],
    mutationFn: async (prompt: string) => {
      const userBooks = await getBooks(user, "all", "all");
      const response = (await fetch(`/api/suggestions`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ prompt, userBooks }),
      }).then((res) => res.json())) as Promise<SuggestionsResponseType>;

      return response;
    },
  });

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
    data,
    userMessage,
  };
};
