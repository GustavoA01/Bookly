import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { keys } from '../../keys';
import { BookType } from '@/src/data/types/books';

export const getBooksFromList = async (books: string[]) => {
  try {
    if (!books || books.length === 0) return [];
    const booksRef = collection(db, keys.firebase.books);
    const batches = [];

    for (let i = 0; i < books.length; i += 30) {
      const chunk = books.slice(i, i + 30);
      const booksQuery = query(booksRef, where(documentId(), 'in', chunk));
      batches.push(getDocs(booksQuery));
    }

    const snapshots = await Promise.all(batches);
    const booksData: BookType[] = [];

    snapshots.forEach((snapshot) => {
      snapshot.docs.forEach((doc) => {
        booksData.push({
          id: doc.id,
          ...doc.data(),
        } as BookType);
      });
    });

    return booksData as BookType[];
  } catch (error) {
    console.error('Erro ao buscar livros da lista:', error);
    return [];
  }
};
