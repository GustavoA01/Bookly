"use client";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { BookType, FilterOptionsType, Status } from "@/src/data/types/books";
import { keys } from "../../keys";
import { User } from "firebase/auth";

export const getBooks = async (
  user: User | null,
  orderQuery: FilterOptionsType | "",
  status: Status | "" | "all",
) => {
  try {
    if (!user) {
      console.warn("Usuário não autenticado");
      return [];
    }

    const constraints: QueryConstraint[] = [where("userId", "==", user.uid)];

    if (status && status !== "all")
      constraints.push(where("status", "==", status));

    if (orderQuery && orderQuery !== "all") {
      switch (orderQuery) {
        case "title":
          constraints.push(orderBy("title", "desc"));
          break;
        case "author":
          constraints.push(orderBy("author", "desc"));
          break;
        case "createdAt":
          constraints.push(orderBy("createdAt", "desc"));
          break;
        case "startDate":
          constraints.push(orderBy("startDate", "desc"));
          break;
        case "endDate":
          constraints.push(orderBy("endDate", "desc"));
          break;
        case "rating":
          constraints.push(orderBy("rating", "desc"));
          break;
        default:
          break;
      }
    }

    const q = query(collection(db, keys.firebase.books), ...constraints);
    const querySnapshot = (await getDocs(q)).docs;

    const books = querySnapshot.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return books as BookType[];
  } catch (error) {
    console.log("Error fetching books:", error);
    throw new Error("Error fetching books: " + (error as Error).message);
  }
};
