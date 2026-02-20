import { BookType } from "@/src/data/types/books";
import { FirebaseError } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { keys } from "../../keys";

export const createBook = async (bookData: Omit<BookType, "id">) => {
  try {
    await addDoc(collection(db, keys.firebase.books), bookData);
  } catch (error) {
    throw new Error("Error creating book: " + (error as FirebaseError).message);
  }
};
