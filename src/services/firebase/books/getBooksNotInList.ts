import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { keys } from '../../keys';
import { BookType } from '@/src/data/types/books';

export const getBooksNotInList = async (
  listId: string,
  userId: string | null
) => {
  try {
    if (!userId) return [];

    const listRef = doc(db, keys.firebase.lists, listId);
    const listSnap = await getDoc(listRef);

    if (!listSnap.exists()) {
      console.warn('Lista não encontrada');
      return [];
    }

    const bookIdsInList: string[] = listSnap.data().books || [];

    const bookQuery = query(
      collection(db, keys.firebase.books),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(bookQuery);

    const booksNotInList = snapshot.docs
      .map((doc) => ({
        ...(doc.data() as BookType),
        id: doc.id,
      }))
      .filter((book) => !bookIdsInList.includes(book.id));

    return booksNotInList;
  } catch (error) {
    console.error('Erro ao buscar livros fora da lista:', error);
    return [];
  }
};
