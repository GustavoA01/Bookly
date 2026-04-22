import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { keys } from '../../keys';
import { deleteImageCloudinary } from '@/src/actions/deleteImageCloudinary';

export const deleteList = async (id: string) => {
  try {
    const listRef = doc(db, keys.firebase.lists, id);
    const listSnap = await getDoc(listRef);

    if (!listSnap.exists()) throw new Error('Lista não encontrada.');
    const { imagePublicId } = listSnap.data();

    await deleteImageCloudinary(imagePublicId);
    await deleteDoc(listRef);
  } catch (error) {
    console.error('Erro ao deletar lista:', error);
    throw new Error('Não foi possível deletar a lista');
  }
};
