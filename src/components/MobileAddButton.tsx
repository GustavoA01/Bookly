"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "../hooks/AuthProvider";

export const MobileAddButton = () => {
  const { user } = useAuth();
  const redirecHref = user ? "/novo-livro" : "/login";

  return (
    <Link href={redirecHref}>
      <Button
        asChild
        className="sm:hidden fixed z-10 right-5 bottom-20 rounded-full w-12 h-12"
      >
        <Plus data-testid="plus-icon" />
      </Button>
    </Link>
  );
};
