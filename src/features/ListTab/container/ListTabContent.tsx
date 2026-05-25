'use client';
import { ListCard } from '@/src/features/ListTab/components/ListCard';
import { Dialog } from '@/src/components/ui/dialog';
import { NewListForm } from './NewListForm';
import { Skeleton } from '@/src/components/ui/skeleton';
import { Input } from '@/src/components/ui/input';
import { useRouter } from 'next/navigation';
import { DialogListTrigger } from '../components/DialogListTrigger';
import { useListTabContent } from '../hooks/useListTabContent';

export const ListTabContent = () => {
  const { push } = useRouter();
  const { isListsLoading, lists, setSearchText, user } = useListTabContent();

  return (
    <div className="space-y-2">
      <Input
        className="w-full sm:max-w-80"
        placeholder="Pesquisar"
        onChange={(e) => setSearchText(e.target.value)}
      />

      <main className="sm:grid sm:grid-cols-2 md:grid-cols-3 max-sm:space-y-2 lg:grid-cols-4 gap-2 mt-2">
        <Dialog>
          <DialogListTrigger onClick={() => !user && push('/login')} />
          <NewListForm />
        </Dialog>

        {isListsLoading ? (
          <>
            {[...Array(7)].map((_, index) => (
              <Skeleton key={index} className="h-25 rounded-lg" />
            ))}
          </>
        ) : (
          <>
            {lists && lists.length === 0 ? (
              <div className="col-span-full flex justify-center items-center h-40">
                <p className="text-muted-foreground">
                  Nenhuma lista criada ainda
                </p>
              </div>
            ) : null}
          </>
        )}

        {lists &&
          lists.map((list) => (
            <ListCard
              key={list.id}
              id={list.id}
              name={list.name}
              itemCount={list.books.length}
            />
          ))}
      </main>
    </div>
  );
};
