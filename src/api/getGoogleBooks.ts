import { GoogleBooksResponse } from "../data/types/api";
import { api } from "../lib/axios";

export const getGoogleBooks = async (
  query = "intitle:a",
): Promise<GoogleBooksResponse> => {
  const books = (await api
    .get(`?q=${query}&maxResults=12`)
    .then((res) => res.data)) as GoogleBooksResponse;

  return books;
};
