import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { booksKey } from "../firebaseKeys";
import { BookType } from "@/src/data/types/books";

export const getBookById = async (bookId: string) => {
  try {
    const bookDoc = await getDoc(doc(db, booksKey, bookId));

    if (!bookDoc.exists()) throw new Error("Livro não encontrado");

    const bookData = bookDoc.data();

    return { id: bookDoc.id, ...bookData } as BookType;
  } catch (error) {
    console.error("Erro ao buscar livro por ID:", error);
    throw error;
  }
};
