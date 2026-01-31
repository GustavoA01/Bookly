"use client";
import { DatePicker } from "@/src/components/ui/DatePicker";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { ImageForm } from "@/src/features/NewBook/components/ImageForm";
import { useState } from "react";

export const BookForm = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <form className="flex flex-col sm:grid grid-cols-5">
      <div className="col-span-3 flex flex-col space-y-4 p-4">
        <Label>Título*</Label>
        <Input placeholder="Ex: O Hobbit" />

        <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:space-x-2">
          <div className="space-y-2 cols-span-1">
            <Label>Autor</Label>
            <Input placeholder="Ex: J.R.R. Tolkien" />
          </div>
          <div className="space-y-2 cols-span-1">
            <Label>Gênero</Label>
            <Input placeholder="Ex: Fantasia" />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:space-x-2">
          <div className="space-y-2 cols-span-1">
            <DatePicker
              label="Início"
              date={startDate}
              setDate={setStartDate}
            />
          </div>

          <div className="space-y-2 cols-span-1">
            <DatePicker label="Término" date={endDate} setDate={setEndDate} />
          </div>
        </div>

        <Label>Sinopse</Label>
        <Textarea className="resize-none" />

        <Label>Comentário</Label>
        <Textarea className="resize-none" />
      </div>

      <ImageForm />
    </form>
  );
};
