"use client";
import { DatePicker } from "@/src/components/ui/DatePicker";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { ImageForm } from "@/src/features/NewBook/components/ImageForm";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookFormType, bookSchema } from "@/src/data/schemas";
import { Button } from "@/src/components/ui/button";

export const BookForm = () => {
  const methods = useForm<BookFormType>({
    resolver: zodResolver(bookSchema),
  });
  const { register, handleSubmit } = methods;

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleCleanDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleCreateBook = (data: BookFormType) => {
    const book = {
      ...data,
      startDate,
      endDate,
    };
    console.log(book);
  };

  return (
    <form
      id="book-form"
      onSubmit={handleSubmit(handleCreateBook)}
      className="flex flex-col sm:grid grid-cols-5"
    >
      <div className="col-span-3 flex flex-col space-y-4 p-4">
        <Label>Título*</Label>
        <Input {...register("title")} placeholder="Ex: O Hobbit" />

        <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:space-x-2">
          <div className="space-y-2 cols-span-1">
            <Label>Autor</Label>
            <Input {...register("author")} placeholder="Ex: J.R.R. Tolkien" />
          </div>
          <div className="space-y-2 cols-span-1">
            <Label>Gênero</Label>
            <Input {...register("genre")} placeholder="Ex: Fantasia" />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:space-x-2">
          <div className="space-y-2 cols-span-1">
            <Label>Número de páginas</Label>
            <Input {...register("numberOfPages")} placeholder="Ex: 300" />
          </div>
          <div className="space-y-2 cols-span-1">
            <Label>Página atual</Label>
            <Input {...register("currentPage")} placeholder="Ex: 150" />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:space-x-2">
          <div className="space-y-2 w-full">
            <DatePicker
              label="Início"
              date={startDate}
              setDate={setStartDate}
            />
          </div>

          <div className="space-y-2 w-full">
            <DatePicker label="Término" date={endDate} setDate={setEndDate} />
          </div>

          {(startDate || endDate) && (
            <Button
              variant="outline"
              onClick={handleCleanDates}
              className="w-full sm:w-auto mt-auto"
            >
              Limpar datas
            </Button>
          )}
        </div>

        <Label>Sinopse</Label>
        <Textarea {...register("synopsis")} className="resize-none" />

        <Label>Comentário</Label>
        <Textarea {...register("comment")} className="resize-none" />
      </div>

      <FormProvider {...methods}>
        <ImageForm register={register} />
      </FormProvider>
    </form>
  );
};
