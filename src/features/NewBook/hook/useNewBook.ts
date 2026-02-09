import { BookFormType, bookSchema } from "@/src/data/schemas";
import { Status } from "@/src/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAfter } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useNewBook = () => {
  const methods = useForm<BookFormType>({
    resolver: zodResolver(bookSchema),
  });
  const {
    register,
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

  return {
    methods,
    register,
    errors,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    choosedFile,
    setChoosedFile,
    chooseImageError,
    setChooseImageError,
    showImage,
    cleanCurrentImage,
    handleImageError,
    handleFileChange,
    dateErrorMessage,
    handleCleanDates,
    handleCreateBook,
  };
};
