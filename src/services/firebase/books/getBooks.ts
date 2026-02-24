"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { BookType } from "@/src/data/types/books";
import { keys } from "../../keys";

export const getBooks = async () => {
  try {
    if (!auth.currentUser) {
      console.warn("Usuário não autenticado");
      return [];
    }
    const q = query(
      collection(db, keys.firebase.books),
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
