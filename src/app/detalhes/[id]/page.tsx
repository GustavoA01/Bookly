import { BackButton } from "@/src/components/BackButton";
import { BookDetails } from "@/src/features/BookDetailsPage/container/BookDetails";

const GoogleDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // const { id } = await params

  return (
    <div className="space-y-8">
      <BackButton />
      <BookDetails
        id="1"
        title="Senhor dos anéis"
        author={"Tolkien"}
        rating={98}
        status={"reading"}
        imageUrl={"/detalhes-mock.jpg"}
        sinopse={"Sinopse não disponível"}
        comment={null}
      />
    </div>
  );
};

export default GoogleDetailsPage;
