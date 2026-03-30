import { chatSchema } from "@/src/data/schemas";
import { SuggestionsResponseType } from "@/src/data/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useBooklyIa = () => {
  const { register, handleSubmit, reset } = useForm<{ prompt: string }>({
    resolver: zodResolver(chatSchema),
  });
  const [userMessage, setUserMessage] = useState<string>("");

  const {
    data,
    mutateAsync: searchBooks,
    isPending,
  } = useMutation({
    mutationKey: ["suggestions"],
    mutationFn: async (prompt: string) =>
      fetch(`/api/suggestions`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ prompt }),
      }).then((res) => res.json()) as Promise<SuggestionsResponseType>,
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
