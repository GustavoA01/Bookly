import { FirebaseError } from 'firebase/app';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { keys } from '../../keys';
import { ListType } from '@/src/data/types/books';

export const createList = async (listData: Omit<ListType, 'id'>) => {
  try {
    await addDoc(collection(db, keys.firebase.lists), listData);
  } catch (error) {
    throw new Error('Error creating list: ' + (error as FirebaseError).message);
  }
};
