import { GoogleBooksResponse } from '../../data/types/api';

export const getGoogleBooks = async (
  query: string,
  currentPage: number
): Promise<GoogleBooksResponse | null> => {
  if (!query) return null;

  const startIndex = (currentPage - 1) * 12;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=12`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Erro na API do Google: Status ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Erro de rede ao buscar livros:', error);
    return null;
  }
};
