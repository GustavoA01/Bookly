import { NewBookHeader } from "@/src/features/NewBook/components/NewBookHeader";
import { BookForm } from "@/src/features/NewBook/container/BookForm";

const NewBookPage = () => {
  return (
    <main className="flex flex-col space-y-4">
      <NewBookHeader />
      <BookForm />
    </main>
  );
};

export default NewBookPage;
