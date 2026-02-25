"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { ImageOff } from "lucide-react";
import { ImageForm } from "../components/NewListForm/ImageForm";
import { FormFooter } from "../components/NewListForm/FormFooter";
import { Button } from "@/src/components/ui/button";
import { DescriptionForm } from "../components/NewListForm/DescriptionForm";
import { useNewList } from "../hooks/useNewList";

export const NewListForm = () => {
  const {
    chooseImageError,
    cleanCurrentImage,
    choosedFile,
    handleCreateList,
    handleFileChange,
    handleImageError,
    showImage,
    setChoosedFile,
    methods: { register, handleSubmit, setValue },
  } = useNewList();

  return (
    <DialogContent
      showCloseButton={false}
      className="overflow-y-auto max-h-[90%]"
    >
      <DialogHeader>
        <DialogTitle>Criar Nova Lista</DialogTitle>
        <DialogDescription>
          Crie listas personalizadas e adicione livros a elas.
        </DialogDescription>
      </DialogHeader>

      <form
        id="new-list-form"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleCreateList)}
      >
        <DescriptionForm register={register} />

        <ImageForm
          register={register}
          setValue={setValue}
          choosedFile={choosedFile}
          setChoosedFile={setChoosedFile}
          handleFileChange={handleFileChange}
          showImage={!!showImage}
          handleImageError={handleImageError}
        />
      </form>

      {choosedFile && (
        <Button
          variant="destructive"
          onClick={cleanCurrentImage}
          className="max-sm:w-full w-8 h-8 ml-auto"
        >
          <ImageOff />
        </Button>
      )}

      {chooseImageError && (
        <p className="text-sm text-red-600">{chooseImageError}</p>
      )}

      <FormFooter />
    </DialogContent>
  );
};
