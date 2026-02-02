import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const MobileAddButton = ({ tab }: { tab: string | undefined }) => {
  const addFunction = () => {
    if (!tab || tab === "books") return "/novo-livro";
    else return "/nova-lista";
  };

  return (
    <Link href={addFunction()}>
      <Button className="sm:hidden fixed z-10 right-5 bottom-20 rounded-full w-12 h-12">
        <Plus data-testid="plus-icon" />
      </Button>
    </Link>
  );
};
