import { BookActions } from "@/src/features/BookDetailsPage/components/BookActions";
import { BookDetails } from "@/src/features/BookDetailsPage/container/BookDetails";

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  // const {id} = await params

  const mockImage = "/detalhes-mock.jpg";

  return (
    <div>
      <BookActions />
      <BookDetails sinopse={"null"} comment={null} mockImage={mockImage} />
    </div>
  );
};

export default DetailsPage;
