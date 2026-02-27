"use client";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/contexts/AuthProvider";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AddBuyButtonProps = {
  id?: string;
  buyLink?: string;
};

export const AddBuyButton = ({ id, buyLink }: AddBuyButtonProps) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const isGoogleDetailsPage = pathname.includes("/detalhes/");
  const redirectHref = user ? `/novo-livro?id=${id}&role=google` : "/login";

  return (
    <>
      {isGoogleDetailsPage ? (
        <div className="flex flex-col gap-2">
          <Link href={redirectHref} title="Adicionar livro à biblioteca">
            <Button variant="secondary" className="w-full">
              <Plus />
              <p>Adicionar</p>
            </Button>
          </Link>

          {buyLink && (
            <Link href={buyLink} target="_blank" title="Ir para Google Play">
              <Button className="w-full">Comprar</Button>
            </Link>
          )}
        </div>
      ) : null}
    </>
  );
};
