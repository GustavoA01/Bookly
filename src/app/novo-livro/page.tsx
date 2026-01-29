import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { NewBookHeader } from "@/src/features/NewBook/components/NewBookHeader";

const NewBookPage = () => {
  return (
    <main className="flex flex-col space-y-4">
      <NewBookHeader />

      <form className="flex flex-col sm:grid grid-cols-5">
        <div className="col-span-3 flex flex-col space-y-4 p-4">
          <Label>Título</Label>
          <Input placeholder="Ex: O Hobbit" />

          <div className="flex flex-col gap-4 sm:grid grid-cols-2 space-x-2">
            <div className="space-y-2 cols-span-1">
              <Label>Autor</Label>
              <Input placeholder="Ex: J.R.R. Tolkien" />
            </div>
            <div className="space-y-2 cols-span-1">
              <Label>Gênero</Label>
              <Input placeholder="Ex: Fantasia" />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:grid grid-cols-2 space-x-2">
            <div className="space-y-2 cols-span-1">
              <Label>Início</Label>
              <Input />
            </div>

            <div className="space-y-2 cols-span-1">
              <Label>Término</Label>
              <Input />
            </div>
          </div>

          <Label>Sinopse</Label>
          <Textarea className="resize-none" />

          <Label>Comentário</Label>
          <Textarea className="resize-none" />
        </div>
        <div className="col-span-2 flex flex-col gap-4 p-4"></div>
      </form>
    </main>
  );
};

export default NewBookPage;
