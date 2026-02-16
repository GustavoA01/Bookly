"use client";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AddBuyButton = ({ buyLink }: { buyLink?: string }) => {
  const pathname = usePathname();
  const isGoogleDetailsPage = pathname.includes("/detalhes/");

  return (
    <>
      {isGoogleDetailsPage ? (
        <div className="flex flex-col gap-2">
          <Button variant="secondary">
            <Plus />
            <p>Adicionar</p>
          </Button>

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
