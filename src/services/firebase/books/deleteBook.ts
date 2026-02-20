import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { keys } from "../../keys";

export const deleteBook = async (id: string) => {
  try {
    await deleteDoc(doc(db, keys.firebase.books, id));
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    throw new Error(
      "Não foi possível deletar o livro. Tente novamente mais tarde.",
    );
  }
};
