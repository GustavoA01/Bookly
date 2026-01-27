"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export const MobileAddButton = ({ tab }: { tab: string | undefined }) => {
  const addFunction = () => {
    if (!tab || tab === "books") {
    } else {
    }
  };

  return (
    <Button
      onClick={addFunction}
      className="sm:hidden fixed z-10 right-5 bottom-20 rounded-full w-12 h-12"
    >
      <Plus />
    </Button>
  );
};
