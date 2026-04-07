import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { keys } from "../../keys";

export const deleteChat = async (chatId: string) => {
  try {
    const chatRef = doc(db, keys.firebase.chat, chatId);
    await deleteDoc(chatRef);
  } catch (error) {
    console.error("Error deleting chat document:", error);
  }
};
