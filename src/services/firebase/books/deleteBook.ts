import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { keys } from "../../keys";

export const deleteBook = async (id: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const batch = writeBatch(db);

    const listQuery = query(
      collection(db, keys.firebase.lists),
      where("userId", "==", user.uid),
      where("books", "array-contains", id),
    );

    const listsSnapshot = await getDocs(listQuery);

    listsSnapshot.forEach((listDoc) => {
      const listRef = doc(db, keys.firebase.lists, listDoc.id);

      batch.update(listRef, {
        books: arrayRemove(id),
      });
    });

    await batch.commit();

    await deleteDoc(doc(db, keys.firebase.books, id));
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    throw new Error(
      "Não foi possível deletar o livro. Tente novamente mais tarde.",
    );
  }
};
