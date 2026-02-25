import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { keys } from "../../keys";
import { BookType } from "@/src/data/types/books";
import { User } from "firebase/auth";

export const updateBook = async (
  book: Omit<BookType, "userId" | "id" | "createdAt">,
  id: string,
  user: User | null,
) => {
  try {
    if (!user) throw new Error("Usuário não autenticado");

    const docRef = doc(db, keys.firebase.books, id);
    await updateDoc(docRef, book);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    throw new Error("Erro ao atualizar livro");
  }
};
