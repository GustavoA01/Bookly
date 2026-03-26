"use client";
import { SearchBookCard } from "@/src/components/SearchBookCard";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Spinner } from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { chatSchema } from "@/src/data/schemas";
import { SuggestionsResponseType } from "@/src/data/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const BooklyIAPage = () => {
  const { register, handleSubmit, reset } = useForm<{ prompt: string }>({
    resolver: zodResolver(chatSchema),
  });
  const [userMessage, setUserMessage] = useState<string>("");

  const {
    data,
    mutateAsync: searchBooks,
    isPending,
  } = useMutation({
    mutationKey: ["suggestions"],
    mutationFn: async (prompt: string) =>
      fetch(`/api/suggestions`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ prompt }),
      }).then((res) => res.json()) as Promise<SuggestionsResponseType>,
  });

  const handleSearch = async (data: { prompt: string }) => {
    try {
      reset({ prompt: "" });
      setUserMessage(data.prompt);
      await searchBooks(data.prompt);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="space-y-4">
      <header className="text-center space-y-4 mt-8">
        <h1 className="sm:text-4xl text-2xl animate-fade-in-title font-bold">
          Bookly IA
        </h1>
        <p className="text-muted-foreground animate-fade-in-subtitle">
          Encontre novos livros conversando com a IA baseado com nos livros que
          já possui
        </p>
      </header>

      {userMessage && (
        <Card className="bg-primary-foreground overflow-y-auto max-h-60 w-full sm:max-w-2xl m-auto animate-fade-in-title ">
          <CardContent className="flex flex-col gap-4">
            <span className="ml-auto text-sm py-2 px-4 bg-primary/60 rounded-lg rounded-tr-none">
              {userMessage}
            </span>
            {data?.chatResponse && (
              <p className="text-muted-foreground">{data.chatResponse}</p>
            )}
          </CardContent>
        </Card>
      )}

      <form
        onSubmit={handleSubmit(handleSearch)}
        className="flex justify-center gap-2 m-auto mt-8 w-full"
      >
        <Textarea
          className="resize-none max-w-2xl min-h-10 max-h-20"
          placeholder="Peça livros..."
          {...register("prompt")}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(handleSearch)();
            }
          }}
        />
        <Button className="mt-auto" disabled={isPending}>
          {isPending ? <Spinner /> : <Send />}
        </Button>
      </form>

      <div className="flex gap-4 overflow-x-auto m-auto mt-8 pt-4 max-w-3xl sm:grid grid-cols-5">
        {data?.suggestions?.map((book) => {
          return (
            <SearchBookCard
              key={book.id}
              id={book.id}
              title={book.volumeInfo.title || "Desconhecido"}
              author={book.volumeInfo.authors?.[0] || "Desconhecido"}
              imageUrl={
                book.volumeInfo.imageLinks?.thumbnail || "/img-placeholder.jpg"
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
