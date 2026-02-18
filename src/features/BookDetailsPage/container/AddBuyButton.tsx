"use client";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AddBuyButtonProps = {
  id?: string;
  buyLink?: string;
};

export const AddBuyButton = ({ id, buyLink }: AddBuyButtonProps) => {
  const pathname = usePathname();
  const isGoogleDetailsPage = pathname.includes("/detalhes/");

  return (
    <>
      {isGoogleDetailsPage ? (
        <div className="flex flex-col gap-2">
          <Link href={`/novo-livro?id=${id}&role=google`}>
            <Button variant="secondary" className="w-full">
              <Plus />
              <p>Adicionar</p>
            </Button>
          </Link>

          {buyLink && (
            <Link href={buyLink} target="_blank">
              <Button className="w-full">Comprar</Button>
            </Link>
          )}
        </div>
      ) : null}
    </>
  );
};
