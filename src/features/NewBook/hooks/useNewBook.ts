import { BookFormType, bookSchema } from "@/src/data/schemas";
import { FormSearchParamsType } from "@/src/data/types/api";
import { BookType, Status } from "@/src/data/types/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBookDates } from "./useBookDates";
import { useImageForm } from "../../../hooks/useImageForm";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useBookMutation } from "./useBookMutation";
import { useFetchBookForm } from "./useFetchBookForm";
import { useAuth } from "@/src/contexts/AuthProvider";

export const useNewBook = ({ id, role }: FormSearchParamsType) => {
  const { user } = useAuth();
  const router = useRouter();
  const methods = useForm<BookFormType>({
    resolver: zodResolver(bookSchema),
  });
  const {
    setValue,
    reset,
    formState: { errors },
  } = methods;
  const [status, setStatus] = useState<Status>("toRead");

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleCleanDates,
    dateErrorMessage,
  } = useBookDates();

  const {
    choosedFile,
    setChoosedFile,
    chooseImageError,
    showImage,
    cleanCurrentImage,
    handleImageError,
    handleFileChange,
    uploadImageToCloudinary,
  } = useImageForm(setValue);

  const { createBookFn, updateBookFn } = useBookMutation(id);

  useFetchBookForm({
    params: { id, role },
    reset,
    setChoosedFile,
    setEndDate,
    setStartDate,
    setStatus,
  });

  const handleUpdateBook = async (
    book: Omit<BookFormType, "userId">,
    finalImageUrl: string | null,
  ) => {
    const bookToUpdate: Omit<BookType, "userId" | "id" | "createdAt"> = {
      title: book.title,
      author: book.author || null,
      genre: book.genre || null,
      status,
      rating: book.rating ?? null,
      totalPages: book.numberOfPages || null,
      currentPage: book.currentPage ?? null,
      synopsis: book.synopsis || null,
      comment: book.comment || null,
      imageUrl: finalImageUrl,
      startDate: startDate === undefined ? null : Timestamp.fromDate(startDate),
      endDate: endDate === undefined ? null : Timestamp.fromDate(endDate),
    };

    await updateBookFn(bookToUpdate);
  };

  const handleCreateBook = async (data: BookFormType) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (dateErrorMessage) return;

    let finalImageUrl = data.imageUrl || null;

    if (data.imageFile) {
      try {
        finalImageUrl = await uploadImageToCloudinary(data.imageFile);
      } catch (error) {
        console.error("Erro no upload da imagem:", error);
        return;
      }
    }

    if (id && role === "library") {
      handleUpdateBook(data, finalImageUrl);
      return;
    }

    const book = {
      title: data.title,
      author: data.author || null,
      genre: data.genre || null,
      status,
      rating: data.rating ?? null,
      totalPages: data.numberOfPages || null,
      currentPage: data.currentPage ?? null,
      synopsis: data.synopsis || null,
      comment: data.comment || null,
      imageUrl: finalImageUrl,
      startDate: startDate === undefined ? null : Timestamp.fromDate(startDate),
      endDate: endDate === undefined ? null : Timestamp.fromDate(endDate),
      createdAt: Timestamp.now(),
      userId: user.uid,
    };

    await createBookFn(book);
  };

  return {
    methods,
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
    showImage,
    cleanCurrentImage,
    handleImageError,
    handleFileChange,
    dateErrorMessage,
    handleCleanDates,
    handleCreateBook,
  };
};
