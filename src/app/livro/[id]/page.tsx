import { BookActions } from "@/src/features/BookDetailsPage/components/BookActions";
import { BookDetails } from "@/src/features/BookDetailsPage/container/BookDetails";

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // const {id} = await params

  const mockImage = "/detalhes-mock.jpg";

  return (
    <div className="space-y-8">
      <BookActions />
      <BookDetails
        id="1"
        title="O Senhor dos Anéis"
        author={"J.R.R. Tolkien"}
        rating={98}
        status={"reading"}
        sinopse={null}
        comment={null}
        imageUrl={mockImage}
        genre={"Fantasia"}
        currentPage={150}
        totalPages={500}
        startDate={"2023-01-01"}
        endDate={"2023-12-31"}
      />
    </div>
  );
};

export default BookDetailsPage;
