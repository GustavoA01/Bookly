import { SearchBookCard } from "@/src/components/SearchBookCard";
import { Input } from "@/src/components/ui/input";

const ExplorePage = () => {
  return (
    <div className="space-y-4">
      <Input placeholder="Buscar" className="w-full sm:max-w-80" />

      <div className="gap-2 space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {[...Array(8)].map((_, i) => (
          <SearchBookCard
            key={i}
            title="Senhor dos Anéis"
            author="J.R.R. Tolkien"
            imageUrl="/detalhes-mock.jpg"
            rating={4.8}
            genre="Fantasia"
          />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
