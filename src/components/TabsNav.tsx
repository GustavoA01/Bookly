import Link from "next/link";
import { Button } from "./ui/button";
import { LibraryBig, List } from "lucide-react";

export const TabsNav = ({ tab = "books" }: { tab: string | undefined }) => {
  const tabs = [
    {
      label: "Livros",
      value: "books",
      variant: tab === "books" ? "secondary" : "ghost",
      className: tab === "books" ? "" : "text-muted-foreground",
      icon: <LibraryBig />,
    },
    {
      label: "Listas",
      value: "lists",
      variant: tab === "lists" ? "secondary" : "ghost",
      className: tab === "lists" ? "" : "text-muted-foreground",
      icon: <List />,
    },
  ];

  return (
    <nav className="bg-card rounded-lg flex gap-2 p-1 w-fit mb-2 max-sm:w-full justify-center">
      {tabs.map(({ label, value, variant, className, icon }) => (
        <Link key={value} href={`?tab=${value}`} className="w-full">
          <Button
            size="sm"
            variant={variant as "secondary" | "ghost"}
            className={`${className} w-full`}
          >
            {icon}
            <p>{label}</p>
          </Button>
        </Link>
      ))}
    </nav>
  );
};
