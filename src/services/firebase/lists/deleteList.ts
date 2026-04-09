import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { keys } from '../../keys';

export const deleteList = async (id: string) => {
  try {
    await deleteDoc(doc(db, keys.firebase.lists, id));
  } catch (error) {
    console.error('Erro ao deletar lista:', error);
    throw new Error('Não foi possível deletar a lista. Tente novamente mais tarde.');
  }
};
