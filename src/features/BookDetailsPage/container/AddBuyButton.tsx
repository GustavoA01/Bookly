"use client";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export const AddBuyButton = () => {
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

          <Button>Comprar</Button>
        </div>
      ) : null}
    </>
  );
};
