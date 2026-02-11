import { GoogleBookItem } from "../data/types/api";
import { api } from "../lib/axios";

export const getGoogleBook = async (id: string): Promise<GoogleBookItem> => {
  const book = (await api
    .get(`/${id}`)
    .then((res) => res.data)) as GoogleBookItem;
  return book;
};
