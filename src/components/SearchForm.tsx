"use client";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const SearchForm = () => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    if (searchText === search) return;

    const timer = setTimeout(() => {
      startTransition(() => {
        if (searchText) router.push(`/explorar?q=${searchText}`);
        else router.push(`/explorar`);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, search, router]);

  return (
    <form className="flex items-center gap-2">
      <Input
        value={searchText}
        placeholder="Buscar"
        className="w-full sm:max-w-80"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};
