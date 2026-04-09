'use client';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { ImageForm } from '@/src/features/NewBook/components/ImageForm';
import { FormProvider } from 'react-hook-form';
import { DatesForm } from '../components/DatesForm';
import { PagesForm } from '../components/PagesForm';
import { AuthorForm } from '../components/AuthorForm';
import { useNewBook } from '../hooks/useNewBook';
import { FormSearchParamsType } from '@/src/data/types/api';
import { FormErrorMessage } from '@/src/components/FormErrorMessage';

export const BookForm = ({ id, role }: FormSearchParamsType) => {
  const {
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

  const { register, handleSubmit } = methods;

  return (
    <form id="book-form" onSubmit={handleSubmit(handleCreateBook)} className="flex flex-col sm:grid grid-cols-5">
      <div className="col-span-3 flex flex-col space-y-4 p-4">
        <Label>Título*</Label>
        <Input {...register('title')} placeholder="Ex: O Hobbit" />
        <FormErrorMessage showMessage={!!errors.title} message={errors.title?.message} />

        <AuthorForm register={register} />

        <PagesForm register={register} />
        <FormErrorMessage
          showMessage={!!(errors.numberOfPages || errors.currentPage)}
          message={errors.numberOfPages?.message || errors.currentPage?.message}
        />

        <DatesForm
          dateErrorMessage={dateErrorMessage}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleCleanDates={handleCleanDates}
        />
        <FormErrorMessage showMessage={!!dateErrorMessage} message={dateErrorMessage} className="hidden sm:flex" />

        <Label>Sinopse</Label>
        <Textarea {...register('synopsis')} className="resize-none" />

        <Label>Comentário</Label>
        <Textarea {...register('comment')} className="resize-none" />
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
