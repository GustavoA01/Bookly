import { CategorySelect } from "@/src/components/CategorySelect";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { ImageUp } from "lucide-react";

export const ImageForm = () => (
  <div className="col-span-2 flex flex-col gap-4 p-4">
    <Card className="h-64 w-full border border-dashed bg-transparent cursor-pointer hover:border-primary transition-all duration-250">
      <div className="flex flex-col m-auto items-center justify-center gap-2 text-muted-foreground">
        <ImageUp />
        <p>Capa do livro</p>
      </div>
    </Card>

    <Card>
      <CardContent className="flex justify-around">
        <div className="space-y-2">
          <Label>Nota</Label>
          <Input placeholder="Ex: 10" />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <CategorySelect />
        </div>
      </CardContent>
    </Card>
  </div>
);
