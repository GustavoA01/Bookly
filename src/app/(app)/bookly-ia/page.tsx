"use client";
import { getGeminiResponse } from "@/src/actions/getGeminiResponse";
import { SearchBookCard } from "@/src/components/SearchBookCard";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { GoogleBooksResponse } from "@/src/data/types/api";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const BooklyIAPage = () => {
  const { register, handleSubmit } = useForm<{ prompt: string }>();
  const [books, setBooks] = useState<GoogleBooksResponse | undefined>(
    undefined,
  );

  const getBooks = async (prompt: string) => {
    const geminiResponse = await getGeminiResponse(prompt);
    console.log(geminiResponse);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${prompt}&maxResults=5`,
      );
      const books = await response.json();
      setBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const onSubmit = (data: { prompt: string }) => {
    getBooks(data.prompt);
  };

  return (
    <div>
      <header className="text-center space-y-4 mt-8">
        <h1 className="sm:text-4xl text-2xl animate-fade-in-title font-bold">
          Bookly IA
        </h1>
        <p className="text-muted-foreground animate-fade-in-subtitle">
          Encontre novos livros conversando com a IA baseado com nos livros que
          já possui
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center gap-2 m-auto mt-8 w-full"
      >
        <Textarea
          className="resize-none max-w-2xl"
          placeholder="Peça livros..."
          {...register("prompt")}
        />
        <Button>
          <Send />
        </Button>
      </form>

      <div className="flex gap-4 overflow-x-auto m-auto mt-8 pt-4 max-w-3xl sm:grid grid-cols-5">
        {books?.items?.map((book) => {
          return (
            <SearchBookCard
              key={book.id}
              id={book.id}
              title={book.volumeInfo.title || "Desconhecido"}
              author={book.volumeInfo.authors?.[0] || "Desconhecido"}
              imageUrl={
                book.volumeInfo.imageLinks?.thumbnail || "/detalhes-mock.jpg"
              }
              genre={book.volumeInfo.categories?.[0] ?? null}
              rating={book.volumeInfo.averageRating ?? null}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BooklyIAPage;
