import { doc, setDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { keys } from '../../keys';
import { GoogleBookItem } from '@/src/data/types/api';

export const createChat = async (
  userId: string,
  chatResponse: string,
  suggestions: GoogleBookItem[],
  userMessage: string
) => {
  try {
    const chatRef = doc(db, keys.firebase.chat, userId);

    const newMessages = [
      { sender: 'user', text: userMessage, timestamp: new Date() },
      { sender: 'bot', text: chatResponse, timestamp: new Date() },
    ];

    await setDoc(
      chatRef,
      {
        userId,
        messages: arrayUnion(...newMessages),
        suggestions,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error saving/updating chat document:', error);
  }
};
