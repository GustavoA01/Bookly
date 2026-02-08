"use client";
import { DatePicker } from "@/src/components/ui/DatePicker";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { ImageForm } from "@/src/features/NewBook/components/ImageForm";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookFormType, bookSchema } from "@/src/data/schemas";
import { Button } from "@/src/components/ui/button";
import { isAfter } from "date-fns";
import { Status } from "@/src/data/types";

export const BookForm = () => {
  const methods = useForm<BookFormType>({
    resolver: zodResolver(bookSchema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<Status>("toRead");

  const [choosedFile, setChoosedFile] = useState<string | undefined>(undefined);
  const [chooseImageError, setChooseImageError] = useState<string | null>(null);
  const showImage =
    choosedFile &&
    (choosedFile.startsWith("http") || choosedFile.startsWith("blob:")) &&
    choosedFile.length > 10;

  useEffect(() => {
    return () => {
      if (choosedFile) URL.revokeObjectURL(choosedFile);
    };
  }, [choosedFile]);

  const cleanCurrentImage = () => {
    setValue("imageUrl", "");
    setValue("imageFile", undefined);
    setChoosedFile(undefined);
  };

  const handleImageError = () => {
    setChooseImageError("Erro ao carregar a imagem");
    setChoosedFile(undefined);
    setTimeout(() => {
      setChooseImageError(null);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue("imageUrl", "");
      setValue("imageFile", file);
      const fileURL = URL.createObjectURL(file);
      setChoosedFile(fileURL);
    }
  };

  const getErrorMessages = () => {
    if (startDate && endDate && isAfter(startDate, endDate))
      return "A data de término não pode ser anterior à data de início.";
    if (!startDate && endDate)
      return "A data de início é obrigatória para definir a data de término.";
    return "";
  };

  const dateErrorMessage = getErrorMessages();

  const handleCleanDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleCreateBook = (data: BookFormType) => {
    if (dateErrorMessage) return;

    const book = {
      ...data,
      status,
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
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title?.message}</p>
        )}

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
            <Input
              type="number"
              {...register("numberOfPages", {
                setValueAs(value) {
                  return value === "" ? undefined : Number(value);
                },
              })}
              placeholder="Ex: 300"
            />
          </div>
          <div className="space-y-2 cols-span-1">
            <Label>Página atual</Label>
            <Input
              type="number"
              {...register("currentPage", {
                setValueAs(value) {
                  return value === "" ? undefined : Number(value);
                },
              })}
              placeholder="Ex: 150"
            />
          </div>
        </div>

        {(errors.numberOfPages || errors.currentPage) && (
          <p className="text-sm text-red-600">
            {errors.numberOfPages?.message || errors.currentPage?.message}
          </p>
        )}

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

          {dateErrorMessage && (
            <p className="sm:hidden text-sm text-red-600">{dateErrorMessage}</p>
          )}

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

        {dateErrorMessage && (
          <p className="hidden sm:flex text-sm text-red-600">
            {dateErrorMessage}
          </p>
        )}

        <Label>Sinopse</Label>
        <Textarea {...register("synopsis")} className="resize-none" />

        <Label>Comentário</Label>
        <Textarea {...register("comment")} className="resize-none" />
      </div>

      <FormProvider {...methods}>
        <ImageForm
          handleFileChange={handleFileChange}
          chooseImageError={chooseImageError}
          showImage={!!showImage}
          status={status}
          setStatus={setStatus}
          register={register}
          choosedFile={choosedFile}
          setChoosedFile={setChoosedFile}
          handleImageError={handleImageError}
          cleanCurrentImage={cleanCurrentImage}
        />
      </FormProvider>
    </form>
  );
};
