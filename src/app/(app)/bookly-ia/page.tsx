import { IaPageContent } from "@/src/features/BooklyiaPage/container/IaPageContent";

const BooklyIAPage = () => {
  return (
    <div className="space-y-4 pb-8">
      <header className="text-center space-y-4 mt-8">
        <h1 className="sm:text-4xl text-2xl animate-fade-in-title font-bold">
          Bookly IA
        </h1>
        <p className="text-muted-foreground animate-fade-in-subtitle">
          Encontre novos livros conversando com a IA baseado nos livros que já
          possui
        </p>
      </header>

      <IaPageContent />
    </div>
  );
};

export default BooklyIAPage;
