import { Input } from '@/src/components/ui/input';
import { FilterSelect } from './FilterSelect';
import { StatusSelect } from '@/src/components/StatusSelect';
import { Dispatch, SetStateAction } from 'react';
import { FilterOptionsType, Status } from '@/src/data/types/books';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { Plus } from 'lucide-react';

type SearchBookTableProps = {
  setSearchBookText: Dispatch<SetStateAction<string>>;
  status: Status | '';
  filter: FilterOptionsType | '';
  setStatus: Dispatch<SetStateAction<Status | ''>>;
  setFilter: Dispatch<SetStateAction<FilterOptionsType | ''>>;
  redirectHref: string;
};

export const SearchBookTable = ({
  setSearchBookText,
  status,
  filter,
  setStatus,
  setFilter,
  redirectHref,
}: SearchBookTableProps) => (
  <div className="sm:flex space-y-2 justify-between">
    <Input placeholder="Pesquisar" className="w-full sm:max-w-80" onChange={(e) => setSearchBookText(e.target.value)} />

    <div className="flex gap-2">
      <FilterSelect value={filter} onSelect={setFilter as Dispatch<SetStateAction<FilterOptionsType>>} />
      <StatusSelect value={status} onValueChange={setStatus as Dispatch<SetStateAction<Status>>} isHome />

      <Link href={redirectHref} title="Adicionar novo livro">
        <Button className="hidden sm:flex">
          <Plus />
          Novo Livro
        </Button>
      </Link>
    </div>
  </div>
);
