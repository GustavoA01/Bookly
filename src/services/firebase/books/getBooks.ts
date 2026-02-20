"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import { booksKey } from "../firebaseKeys";
import { auth, db } from "../firebaseConfig";
import { BookType } from "@/src/data/types/books";

export const getBooks = async () => {
  try {
    if (!auth.currentUser) {
      console.warn("Usuário não autenticado");
      return [];
    }
    const q = query(
      collection(db, booksKey),
      where("userId", "==", auth.currentUser?.uid),
    );
    const querySnapshot = (await getDocs(q)).docs;

    const books = querySnapshot.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return books as BookType[];
  } catch (error) {
    throw new Error("Error fetching books: " + (error as Error).message);
  }
};
