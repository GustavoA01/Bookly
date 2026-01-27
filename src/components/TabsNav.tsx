import Link from "next/link";
import { Button } from "./ui/button";
import { LibraryBig, List } from "lucide-react";

export const TabsNav = ({ tab }: { tab: string | undefined }) => (
  <nav className="bg-card rounded-lg flex gap-2 p-1 w-fit mb-2 max-sm:w-full justify-center">
    <Link href="?tab=books" className="w-full">
      <Button
        size="sm"
        variant={`${!tab || tab === "books" ? "secondary" : "ghost"}`}
        className={`${!tab || tab === "books" ? "" : "text-muted-foreground"} w-full`}
      >
        <LibraryBig />
        <p>Livros</p>
      </Button>
    </Link>

    <Link href="?tab=lists" className="w-full">
      <Button
        size="sm"
        variant={`${tab === "lists" ? "secondary" : "ghost"}`}
        className={`${tab === "lists" ? "" : "text-muted-foreground"} w-full`}
      >
        <List />
        <p>Listas</p>
      </Button>
    </Link>
  </nav>
);
