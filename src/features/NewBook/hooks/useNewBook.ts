import { BookFormType, bookSchema } from "@/src/data/schemas";
import { FormSearchParamsType, GoogleBookItem } from "@/src/data/types/api";
import { Status } from "@/src/data/types/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBookDates } from "./useBookDates";
import { useImageBook } from "./useImageBook";

export const useNewBook = ({ id, role }: FormSearchParamsType) => {
  const methods = useForm<BookFormType>({
    resolver: zodResolver(bookSchema),
  });
  const {
    setValue,
    reset,
    formState: { errors },
  } = methods;

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
    setChooseImageError,
    showImage,
    cleanCurrentImage,
    handleImageError,
    handleFileChange,
  } = useImageBook(setValue);

  const [status, setStatus] = useState<Status>("toRead");

  const htmlToText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    if (id && role === "google") {
      const fetchBook = async () => {
        const book = (await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`,
        ).then((res) => res.json())) as GoogleBookItem;

        if (book) {
          reset({
            title: book.volumeInfo.title || "",
            author: book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "",
            imageUrl: book.volumeInfo.imageLinks?.thumbnail || "",
            numberOfPages: book.volumeInfo.pageCount || undefined,
            synopsis: htmlToText(book.volumeInfo.description || ""),
            genre: book.volumeInfo.categories
              ? book.volumeInfo.categories[0]
              : "",
          });
          setChoosedFile(book.volumeInfo.imageLinks?.thumbnail || undefined);
        }
      };

      fetchBook();
    }
  }, [id, reset, role, setChoosedFile]);

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
