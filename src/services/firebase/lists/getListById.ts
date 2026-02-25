import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { keys } from "../../keys";
import { ListType } from "@/src/data/types/books";

export const getListById = async (listId: string) => {
  try {
    const docRef = doc(db, keys.firebase.lists, listId);

    const listDoc = await getDoc(docRef);

    if (!listDoc.exists()) throw new Error("Lista não encontrada");
    const listData = listDoc.data();

    return { id: listDoc.id, ...listData } as ListType;
  } catch (error) {
    console.error("Error fetching list by ID:", error);
    throw error;
  }
};
