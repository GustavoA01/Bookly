import { ListCard } from "@/src/features/ListTab/components/ListCard";
import { Card } from "@/src/components/ui/card";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
import { NewListForm } from "../components/NewListForm";

export const ListTabContent = () => {
  return (
    <main className="sm:grid sm:grid-cols-2 md:grid-cols-3 max-sm:space-y-2 lg:grid-cols-4 gap-2 mt-2">
      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex h-auto group bg-transparent hover:border-primary border-dashed cursor-pointer transition-all duration-250">
            <div className="m-auto flex flex-col items-center text-muted-foreground text-sm space-y-2">
              <Plus className="group-hover:scale-110 transition-all duration-250 group-hover:text-primary" />
              <p className="group-hover:scale-110 transition-all duration-250 group-hover:text-primary font-montserrat">
                Criar Nova Lista
              </p>
            </div>
          </Card>
        </DialogTrigger>
        <NewListForm />
      </Dialog>

      {[...Array(8)].map((_, index) => (
        <ListCard
          name={`Lista ${index + 1}`}
          itemCount={index + 1}
          key={index}
        />
      ))}
    </main>
  );
};
