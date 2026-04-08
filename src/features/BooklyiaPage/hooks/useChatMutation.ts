import { useAuth } from "@/src/data/contexts/AuthProvider";
import { SuggestionsResponseType } from "@/src/data/types/api";
import { getBooks } from "@/src/services/firebase/books/getBooks";
import { createChat } from "@/src/services/firebase/chat/createChat";
import { deleteChat } from "@/src/services/firebase/chat/deleteChat";
import { getChat } from "@/src/services/firebase/chat/getChat";
import { keys } from "@/src/services/keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useChatMutation = () => {
  const [userTemporaryMessage, setUserTemporaryMessage] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { user, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const isLogged = !!user?.uid && !isLoading;

  const { data: userBooks } = useQuery({
    queryKey: [keys.queryKeys.books, user?.uid],
    queryFn: () => getBooks(user, "all", "all"),
    enabled: isLogged,
  });

  const { data: chat, isPending: isChatPending } = useQuery({
    queryKey: [keys.queryKeys.chat, user?.uid],
    queryFn: () => getChat(user?.uid as string),
    enabled: isLogged,
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
        userTemporaryMessage,
      ).then(() => {
        setUserTemporaryMessage("");
        queryClient.invalidateQueries({
          queryKey: [keys.queryKeys.chat, user?.uid],
        });
      });
    },
  });

  const { mutateAsync: deleteChatFn, isPending: isDeletingChat } = useMutation({
    mutationFn: deleteChat,
    onSuccess: async () => {
      setIsDeleteModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: [keys.queryKeys.chat, user?.uid],
      });
      toast.success("Chat excluído");
    },
    onError: (error) => {
      console.error("Error deleting chat:", error);
      toast.error("Erro ao excluir chat");
    },
  });

  return {
    chat,
    userTemporaryMessage,
    suggestions: data?.suggestions || [],
    searchBooks,
    isChatPending,
    isRequestPending: isPending,
    setUserTemporaryMessage,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deleteChatFn,
    isDeletingChat,
  };
};
