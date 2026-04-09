import { NewBookHeader } from '@/src/features/NewBook/container/NewBookHeader';
import { BookForm } from '@/src/features/NewBook/container/BookForm';
import { FormSearchParamsType } from '@/src/data/types/api';

const NewBookPage = async ({ searchParams }: { searchParams: Promise<FormSearchParamsType> }) => {
  const { id, role } = await searchParams;

  return (
    <main className="flex flex-col space-y-4">
      <NewBookHeader />
      <BookForm id={id} role={role} />
    </main>
  );
};

export default NewBookPage;
