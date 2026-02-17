import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { auth } from "../services/firebase/firebaseConfig";

export const LogOutButton = () => (
  <Button variant="outline" onClick={() => auth.signOut()}>
    <LogIn />
    <p>Sair</p>
  </Button>
);
