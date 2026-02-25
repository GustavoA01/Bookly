"use client";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { FilterOptionsType, Status } from "../data/types/books";
import { FilterSelect } from "./FilterSelect";
import { StatusSelect } from "./StatusSelect";
import { useAuth } from "../hooks/AuthProvider";

export const BookTab = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<Status | "">("");
  const [filter, setFilter] = useState<FilterOptionsType | "">("");
  const redirecHref = user ? "/novo-livro" : "/login";

  return (
    <div className="sm:flex space-y-2 justify-between">
      <Input placeholder="Pesquisar" className="w-full sm:max-w-80" />

      <div className="flex gap-2">
        <FilterSelect
          value={filter}
          onSelect={setFilter as Dispatch<SetStateAction<FilterOptionsType>>}
        />
        <StatusSelect
          value={status}
          onValueChange={setStatus as Dispatch<SetStateAction<Status>>}
          isHome
        />

        <Link href={redirecHref} title="Adicionar novo livro">
          <Button className="hidden sm:flex">
            <Plus />
            Novo Livro
          </Button>
        </Link>
      </div>
    </div>
  );
};
