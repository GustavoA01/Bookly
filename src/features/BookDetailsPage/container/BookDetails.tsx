import Image from "next/image";
import { BookSinopse } from "../components/BookSinopse";
import { BookHeader } from "../components/BookHeader";
import { BookInfo } from "../components/BookInfo";

type BookDetailsProps = {
  mockImage: string | null;
  sinopse: string | null;
  comment: string | null;
};

export const BookDetails = ({
  mockImage,
  sinopse,
  comment,
}: BookDetailsProps) => {
  const isSinopseAndCommentNull = sinopse === null && comment === null;
  const notNullClassName =
    "flex flex-col sm:grid sm:grid-cols-3 mt-8 sm:space-x-4";

  return (
    <main className="flex flex-col justify-center">
      {mockImage && (
        <Image
          className="m-auto sm:hidden max-sm:mb-4 max-h-max rounded-md"
          src={mockImage}
          alt="Book cover"
          width={250}
          height={350}
        />
      )}

      <div className="flex space-x-8 justify-center">
        {mockImage && (
          <Image
            className="hidden sm:block max-sm:mb-4 max-h-max rounded-md"
            src={mockImage}
            alt="Book cover"
            width={250}
            height={350}
          />
        )}

        <BookHeader
          title="O Senhor dos Anéis"
          author="J.R.R. Tolkien"
          isImageNull={mockImage === null}
          status="Lendo"
          rating={70}
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
