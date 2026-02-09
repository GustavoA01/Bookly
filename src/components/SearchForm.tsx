"use client";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export const SearchForm = () => {
  const router = useRouter();

  return (
    <form action="" className="flex items-center gap-2">
      <Input
        placeholder="Buscar"
        className="w-full sm:max-w-80"
        onChange={(e) => router.push(`/explorar?q=${e.target.value}`)}
      />

      <Button variant="secondary">
        <Search />
      </Button>
    </form>
  );
};
