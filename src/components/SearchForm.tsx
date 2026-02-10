"use client";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const SearchForm = () => {
  const { register, reset } = useForm<{ q: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") || "";

  useEffect(() => {
    if (search) reset({ q: search });
  }, [search, reset]);

  return (
    <form action="" className="flex items-center gap-2">
      <Input
        {...register("q")}
        placeholder="Buscar"
        className="w-full sm:max-w-80"
        onChange={(e) => router.push(`/explorar?q=${e.target.value}`)}
      />
    </form>
  );
};
