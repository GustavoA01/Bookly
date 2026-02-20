import { BookType } from "@/src/data/types/books";
import { FirebaseError } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";
import { booksKey } from "../firebaseKeys";
import { db } from "../firebaseConfig";

export const createBook = async (bookData: Omit<BookType, "id">) => {
  try {
    await addDoc(collection(db, booksKey), bookData);
  } catch (error) {
    throw new Error("Error creating book: " + (error as FirebaseError).message);
  }
};
