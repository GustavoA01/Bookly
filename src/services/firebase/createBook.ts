import { FirebaseError } from "firebase/app";

export const createBook = () => {
  try {
  } catch (error) {
    throw new Error("Error creating book: " + (error as FirebaseError).message);
  }
};
