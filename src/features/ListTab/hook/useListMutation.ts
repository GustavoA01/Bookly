import { createList } from "@/src/services/firebase/lists/createList";
import { keys } from "@/src/services/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useListMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createListFn } = useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.queryKeys.lists] });
      toast.success("Lista criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar a lista.");
    },
  });

  return {
    createListFn,
  };
};
