import { getGoogleBook } from "@/src/api/getGoogleBook";
import { BackButton } from "@/src/components/BackButton";
import { BookDetails } from "@/src/features/BookDetailsPage/container/BookDetails";

const GoogleDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const book = await getGoogleBook(id);

  return (
    <div className="space-y-8">
      <BackButton />
      <BookDetails
        id={book.id}
        title={book.volumeInfo.title}
        author={
          book.volumeInfo.authors
            ? book.volumeInfo.authors.join(", ")
            : "Desconhecido"
        }
        genre={
          book.volumeInfo.categories
            ? book.volumeInfo.categories[0]
            : "Desconhecido"
        }
        imageUrl={book.volumeInfo.imageLinks?.thumbnail || "/detalhes-mock.jpg"}
        totalPages={book.volumeInfo.pageCount || null}
        currentPage={null}
        rating={book.volumeInfo.averageRating || null}
        status={null}
        sinopse={book.volumeInfo.description || null}
        startDate={null}
        endDate={null}
        comment={null}
      />
    </div>
  );
};

export default GoogleDetailsPage;
