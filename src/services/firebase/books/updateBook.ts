import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { keys } from "../../keys";
import { BookType } from "@/src/data/types/books";

export const updateBook = async (
  book: Omit<BookType, "userId" | "id" | "createdAt">,
  id: string,
) => {
  try {
    const user = auth.currentUser;
    if (user === null) throw new Error("Usuário não autenticado");

    const docRef = doc(db, keys.firebase.books, id);
    await updateDoc(docRef, book);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    throw new Error("Erro ao atualizar livro");
  }
};
