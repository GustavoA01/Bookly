import { BackButton } from "@/src/components/BackButton";
import { Button } from "@/src/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export const BookActions = () => (
  <header className="flex justify-between items-center">
    <BackButton />

    <div className="flex space-x-4">
      <Button variant="outline" className="rounded-full w-12 h-12">
        <Pencil className="w-auto h-auto" />
      </Button>
      <Button variant="outline" className="rounded-full w-12 h-12">
        <Trash className="w-auto h-auto" />
      </Button>
    </div>
  </header>
);
