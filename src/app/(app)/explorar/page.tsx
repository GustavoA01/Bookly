import { SearchBookCard } from "@/src/components/SearchBookCard";
import { Input } from "@/src/components/ui/input";
import { GoogleBooksResponse } from "@/src/data/types/api";

const ExplorePage = async () => {
  const books = (await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=intitle:a&maxResults=10",
  ).then((res) => res.json())) as GoogleBooksResponse;

  console.log(books.items);

  return (
    <div className="space-y-4">
      <Input placeholder="Buscar" className="w-full sm:max-w-80" />

      <div className="gap-2 sm:gap-4 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {books.items?.map((book) => (
          <SearchBookCard
            key={book.id}
            id={book.id}
            title={book.volumeInfo.title}
            author={
              book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Desconhecido"
            }
            imageUrl={
              book.volumeInfo.imageLinks?.thumbnail || "/detalhes-mock.jpg"
            }
            rating={4.8}
            genre="Fantasia"
          />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
