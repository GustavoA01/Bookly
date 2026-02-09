import { BookActions } from "@/src/features/BookDetailsPage/components/BookActions";
import { BookDetails } from "@/src/features/BookDetailsPage/container/BookDetails";

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
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
        sinopse={"Sinopse do livro muito grande"}
        comment={null}
        imageUrl={mockImage}
      />
    </div>
  );
};

export default DetailsPage;
