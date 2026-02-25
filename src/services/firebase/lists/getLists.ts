import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { keys } from "../../keys";
import { ListType } from "@/src/data/types/books";

export const getLists = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const listQuery = query(
      collection(db, keys.firebase.lists),
      where("userId", "==", user.uid),
    );
    const querySnapshot = await getDocs(listQuery);
    const lists = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return lists as ListType[];
  } catch (error) {
    console.error("Erro ao obter as listas:", error);
    throw new Error("Erro ao obter as listas");
  }
};
