import Image from "next/image";
import { BookSinopse } from "../components/BookSinopse";
import { BookHeader } from "../components/BookHeader";
import { BookInfo } from "../components/BookInfo";
import { BookType } from "@/src/data/types";

export const BookDetails = ({
  title,
  author,
  status,
  rating,
  imageUrl,
  sinopse,
  comment,
}: BookType) => {
  const isSinopseAndCommentNull = sinopse === null && comment === null;
  const notNullClassName =
    "flex flex-col sm:grid sm:grid-cols-3 mt-8 sm:space-x-4";

  return (
    <main className="flex flex-col justify-center">
      {imageUrl && (
        <Image
          className="m-auto sm:hidden max-sm:mb-4 max-h-max rounded-md"
          src={imageUrl}
          alt="Book cover"
          width={250}
          height={350}
        />
      )}

      <div className="flex space-x-8 justify-center">
        {imageUrl && (
          <Image
            className="hidden sm:block max-sm:mb-4 max-h-max rounded-md"
            src={imageUrl}
            alt="Book cover"
            width={250}
            height={350}
          />
        )}

        <BookHeader
          title={title}
          author={author}
          isImageNull={imageUrl === null}
          status={status}
          rating={rating}
        />
      </div>

      <div
        className={
          isSinopseAndCommentNull ? "flex flex-col mt-8" : notNullClassName
        }
      >
        <BookSinopse sinopse={sinopse} comment={comment} />
        <BookInfo isSinopseAndCommentNull={isSinopseAndCommentNull} />
      </div>
    </main>
  );
};
