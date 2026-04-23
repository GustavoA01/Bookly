import Image from 'next/image';
import { BookHeader } from '../components/BookHeader';
import { BookInfo } from '../components/BookInfo';
import { BookSynopsis } from '../components/BookSynopsis';
import { BookDetailsProps } from '../types';

export const BookDetails = ({
  id,
  title,
  author,
  genre,
  rating,
  status,
  imageUrl,
  synopsis,
  comment,
  currentPage,
  totalPages,
  startDate,
  endDate,
  buyLink,
  publisher,
  country,
  language,
}: BookDetailsProps) => {
  const isSynopsisAndCommentNull = synopsis === null && comment === null;
  const notNullClassName =
    'flex flex-col sm:grid sm:grid-cols-3 mt-8 sm:space-x-4';

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
          status={status || undefined}
          rating={rating}
        />
      </div>

      <div
        className={
          isSynopsisAndCommentNull ? 'flex flex-col mt-8' : notNullClassName
        }
      >
        <BookSynopsis synopsis={synopsis} comment={comment} />
        <BookInfo
          id={id}
          genre={genre}
          currentPage={currentPage}
          totalPages={totalPages}
          startDate={startDate}
          endDate={endDate}
          isSynopsisAndCommentNull={isSynopsisAndCommentNull}
          buyLink={buyLink}
          publisher={publisher}
          country={country}
          language={language}
        />
      </div>
    </main>
  );
};
