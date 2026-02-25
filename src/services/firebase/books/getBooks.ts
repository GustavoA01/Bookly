"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { BookType } from "@/src/data/types/books";
import { keys } from "../../keys";
import { User } from "firebase/auth";

export const getBooks = async (user: User | null) => {
  try {
    if (!user) {
      console.warn("Usuário não autenticado");
      return [];
    }
    const q = query(
      collection(db, keys.firebase.books),
      where("userId", "==", user.uid),
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
