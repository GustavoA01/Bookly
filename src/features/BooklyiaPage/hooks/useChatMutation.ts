import { useAuth } from "@/src/data/contexts/AuthProvider";
import { SuggestionsResponseType } from "@/src/data/types/api";
import { getBooks } from "@/src/services/firebase/books/getBooks";
import { createChat } from "@/src/services/firebase/chat/createChat";
import { getChat } from "@/src/services/firebase/chat/getChat";
import { keys } from "@/src/services/keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useChatMutation = () => {
  const [userMessage, setUserMessage] = useState<string>("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: userBooks } = useQuery({
    queryKey: [keys.queryKeys.books, user?.uid],
    queryFn: () => getBooks(user, "all", "all"),
    enabled: !!user,
  });

  const { data: chat, isPending: isChatPending } = useQuery({
    queryKey: [keys.queryKeys.chat, user?.uid],
    queryFn: () => getChat(user?.uid as string),
    enabled: !!user,
  });

  const {
    data,
    mutateAsync: searchBooks,
    isPending,
  } = useMutation({
    mutationKey: ["suggestions"],
    mutationFn: async (prompt: string) => {
      const response = (await fetch(`/api/suggestions`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ prompt, userBooks }),
      }).then((res) => res.json())) as Promise<SuggestionsResponseType>;

      return response;
    },
    onSuccess: async (data) => {
      await createChat(
        user?.uid as string,
        data.chatResponse,
        data.suggestions,
        userMessage,
      ).then(() => {
        setUserMessage("");
        queryClient.invalidateQueries({
          queryKey: [keys.queryKeys.chat, user?.uid],
        });
      });
    },
  });

  return {
    chat,
    userMessage,
    suggestions: data?.suggestions || [],
    searchBooks,
    isChatPending,
    isRequestPending: isPending,
    setUserMessage,
  };
};
