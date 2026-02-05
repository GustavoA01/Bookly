"use client";
import Link from "next/link";
import { CategorySelect } from "./CategorySelect";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Status } from "../data/types";

export const BookTab = () => {
  const [status, setStatus] = useState<Status | "">("");

  return (
    <div className="sm:flex space-y-2 justify-between">
      <Input placeholder="Pesquisar" className="w-full sm:max-w-80" />

      <div className="flex gap-2">
        <CategorySelect value={status} onValueChange={setStatus} isHome />

        <Link href="/novo-livro">
          <Button className="hidden sm:flex">
            <Plus />
            Novo Livro
          </Button>
        </Link>
      </div>
    </div>
  );
};
