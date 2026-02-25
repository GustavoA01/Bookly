import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { keys } from "../../keys";
import { ListType } from "@/src/data/types/books";

export const getListsContainingBook = async (
  bookId: string,
  userId: string | null,
) => {
  try {
    if (!userId) return [];

    const listQuery = query(
      collection(db, keys.firebase.lists),
      where("userId", "==", userId),
      where("books", "array-contains", bookId),
    );

    const snapshot = await getDocs(listQuery);

    const lists = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return lists as ListType[];
  } catch (error) {
    console.log("Erro ao buscar as listas que contém o livro:", error);
    return [];
  }
};
