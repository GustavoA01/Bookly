import { BookFormType, bookSchema } from "@/src/data/schemas";
import { FormSearchParamsType, GoogleBookItem } from "@/src/data/types/api";
import { Status } from "@/src/data/types/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBookDates } from "./useBookDates";
import { useImageBook } from "./useImageBook";
import { Timestamp } from "firebase/firestore";
import { createBook } from "@/src/services/firebase/books/createBook";
import { auth } from "@/src/services/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useNewBook = ({ id, role }: FormSearchParamsType) => {
  const router = useRouter();
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

  const { mutateAsync: createBookFn } = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      toast.success("Livro adicionado!");
      router.push("/");
    },
  });

  const handleCreateBook = async (data: BookFormType) => {
    const user = auth.currentUser;
    if (user === null) {
      router.push("/login");
      return;
    }
    if (dateErrorMessage) return;

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
      imageUrl: data.imageUrl || choosedFile || null,
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
