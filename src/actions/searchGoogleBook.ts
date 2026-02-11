"use server";
import { GoogleBooksResponse } from "../data/types/api";
import { api } from "../lib/axios";

export const searchBooks = async (query: string) => {
  const books = (await api
    .get(`?q=${query === "" ? "intitle:a" : query}&maxResults=10`)
    .then((res) => res.data)) as GoogleBooksResponse;

  return books;
};
