import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { auth } from "../services/firebase/firebaseConfig";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "../services/keys";

export const LogOutButton = () => {
  const queryClient = useQueryClient();

  const hendleLogout = async () => {
    await auth.signOut();
    queryClient.removeQueries({ queryKey: [keys.queryKeys.books] });
  };

  return (
    <Button variant="outline" onClick={hendleLogout}>
      <LogIn />
      <p>Sair</p>
    </Button>
  );
};
