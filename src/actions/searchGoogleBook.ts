"use server";

import { GoogleBooksResponse } from "../data/types/api";

export const searchBooks = async (query: string) => {
  return (await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query === "" ? "intitle:a" : query}&maxResults=10`,
  ).then((res) => res.json())) as GoogleBooksResponse;
};
