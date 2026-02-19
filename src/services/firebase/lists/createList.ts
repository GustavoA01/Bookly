import { FirebaseError } from "firebase/app";

export const createList = () => {
  try {
  } catch (error) {
    throw new Error("Error creating list: " + (error as FirebaseError).message);
  }
};
