import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { keys } from "../../keys";
import { ChatMessageType } from "@/src/data/types/api";

export const getChat = async (userId: string) => {
  try {
    const chatRef = doc(db, keys.firebase.chat, userId);
    const chatDoc = await getDoc(chatRef);

    if (chatDoc.exists()) return chatDoc.data() as ChatMessageType;
    else return null;
  } catch (error) {
    console.error("Error fetching chat document:", error);
    return null;
  }
};
