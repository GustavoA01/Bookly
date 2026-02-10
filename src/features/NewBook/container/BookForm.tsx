"use client";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { ImageForm } from "@/src/features/NewBook/components/ImageForm";
import { FormProvider } from "react-hook-form";
import { DatesForm } from "../components/DatesForm";
import { PagesForm } from "../components/PagesForm";
import { AuthorForm } from "../components/AuthorForm";
import { useNewBook } from "../hook/useNewBook";
import { FormSearchParamsType } from "@/src/data/types/api";

export const BookForm = ({ id, role }: FormSearchParamsType) => {
  const {
    register,
    handleCreateBook,
    dateErrorMessage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleCleanDates,
    chooseImageError,
    showImage,
    status,
    setStatus,
    choosedFile,
    setChoosedFile,
    handleImageError,
    cleanCurrentImage,
    handleFileChange,
    errors,
    methods,
  } = useNewBook({ id, role });

  return (
    <form
      id="book-form"
      onSubmit={methods.handleSubmit(handleCreateBook)}
      className="flex flex-col sm:grid grid-cols-5"
    >
      <div className="col-span-3 flex flex-col space-y-4 p-4">
        <Label>Título*</Label>
        <Input {...register("title")} placeholder="Ex: O Hobbit" />

        {errors.title && (
          <p className="text-sm text-red-600">{errors.title?.message}</p>
        )}

        <AuthorForm register={register} />

        <PagesForm register={register} />

        {(errors.numberOfPages || errors.currentPage) && (
          <p className="text-sm text-red-600">
            {errors.numberOfPages?.message || errors.currentPage?.message}
          </p>
        )}

        <DatesForm
          dateErrorMessage={dateErrorMessage}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleCleanDates={handleCleanDates}
        />

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
