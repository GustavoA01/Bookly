import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { keys } from '../../keys';

export const updateListBooks = async (
  listId: string,
  bookId: string,
  action: 'add' | 'remove'
) => {
  try {
    const listRef = doc(db, keys.firebase.lists, listId);

    await updateDoc(listRef, {
      books: action === 'add' ? arrayUnion(bookId) : arrayRemove(bookId),
    });
  } catch (error) {
    console.error('Erro ao atualizar livros na lista:', error);
    throw new Error('Erro ao atualizar livros na lista');
  }
};
