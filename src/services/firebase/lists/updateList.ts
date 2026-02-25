import { ListType } from "@/src/data/types/books";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { keys } from "../../keys";
import { User } from "firebase/auth";

export const updateList = async (
  list: Pick<ListType, "name" | "description" | "imageUrl">,
  id: string,
  user: User | null,
) => {
  try {
    if (!user) throw new Error("Usuário não autenticado");

    const docRef = doc(db, keys.firebase.lists, id);
    await updateDoc(docRef, list);
  } catch (error) {
    console.error("Erro ao atualizar lista:", error);
    throw new Error("Erro ao atualizar lista");
  }
};
