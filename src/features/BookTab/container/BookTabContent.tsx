'use client';
import Link from 'next/link';
import { BookTable } from '../../BookTable/container';
import { SearchBookTable } from '../components/SearchBookTable';
import { Button } from '@/src/components/ui/button';
import { Plus } from 'lucide-react';
import { useBookTab } from '@/src/features/BookTab/hook/useBookTab';

export const BookTabContent = () => {
  const { setSearchBookText, status, books, isBooksLoading, isUserLoading, redirecHref, filter, setFilter, setStatus } =
    useBookTab();

  return (
    <>
      <SearchBookTable
        setSearchBookText={setSearchBookText}
        status={status}
        filter={filter}
        setStatus={setStatus}
        setFilter={setFilter}
        redirectHref={redirecHref}
      />
      <BookTable books={books} isBooksLoading={isBooksLoading} isUserLoading={isUserLoading} />
      <Link href={redirecHref}>
        <Button asChild className="sm:hidden fixed z-10 right-5 bottom-20 rounded-full w-12 h-12">
          <Plus data-testid="plus-icon" />
        </Button>
      </Link>
    </>
  );
};
