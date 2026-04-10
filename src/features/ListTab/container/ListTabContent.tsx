'use client';
import { ListCard } from '@/src/features/ListTab/components/ListCard';
import { Dialog } from '@/src/components/ui/dialog';
import { NewListForm } from './NewListForm';
import { useQuery } from '@tanstack/react-query';
import { keys } from '@/src/services/keys';
import { getLists } from '@/src/services/firebase/lists/getLists';
import { Skeleton } from '@/src/components/ui/skeleton';
import { useAuth } from '@/src/data/contexts/AuthProvider';
import { Input } from '@/src/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DialogListTrigger } from '../components/DialogListTrigger';

export const ListTabContent = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const { data, isLoading: isListsLoading } = useQuery({
    queryKey: [keys.queryKeys.lists],
    queryFn: getLists,
    enabled: !!user,
  });

  const lists =
    searchText === ''
      ? data
      : data?.filter((list) =>
          list.name.toLowerCase().includes(searchText.toLowerCase())
        );

  return (
    <div className="space-y-2">
      <Input
        className="w-full sm:max-w-80"
        placeholder="Pesquisar"
        onChange={(e) => setSearchText(e.target.value)}
      />

      <main className="sm:grid sm:grid-cols-2 md:grid-cols-3 max-sm:space-y-2 lg:grid-cols-4 gap-2 mt-2">
        <Dialog>
          <DialogListTrigger onClick={() => !user && router.push('/login')} />
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
