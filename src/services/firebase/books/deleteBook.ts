import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { keys } from '../../keys';
import { User } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { deleteImageCloudinary } from '@/src/actions/deleteImageCloudinary';

export const deleteBook = async (id: string, user: User | null) => {
  try {
    const bookRef = doc(db, keys.firebase.books, id);
    const bookSnap = await getDoc(bookRef);

    if (bookSnap.exists()) {
      const { imagePublicId } = bookSnap.data();
      if (!user) throw new Error('Usuário não autenticado');

      const batch = writeBatch(db);

      const listQuery = query(
        collection(db, keys.firebase.lists),
        where('userId', '==', user.uid),
        where('books', 'array-contains', id)
      );
      const listsSnapshot = await getDocs(listQuery);

      listsSnapshot.forEach((listDoc) => {
        const listRef = doc(db, keys.firebase.lists, listDoc.id);

        batch.update(listRef, {
          books: arrayRemove(id),
        });
      });

      await batch.commit();
      await deleteImageCloudinary(imagePublicId);
      await deleteDoc(doc(db, keys.firebase.books, id));
    }
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    throw new Error(
      'Não foi possível deletar o livro. Tente novamente mais tarde.'
    );
  }
};
