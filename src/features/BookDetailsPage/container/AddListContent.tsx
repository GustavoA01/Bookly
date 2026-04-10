import { useAddToList } from '../hooks/useAddToList';

type AddListContentProps = {
  id?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const AddListContent = ({ id, open, setOpen }: AddListContentProps) => {
  const { lists, isLoading, addToListFn } = useAddToList({ id, open, setOpen });

  return (
    <div className="max-h-64 overflow-y-auto">
      {isLoading && (
        <p className="text-center py-4 text-muted-foreground">Carregando...</p>
      )}

      {lists && lists.length > 0 ? (
        <>
          {lists?.map((list) => (
            <div
              key={list.id}
              onClick={() =>
                addToListFn({ listId: list.id, bookId: id!, action: 'add' })
              }
              className="px-4 py-2 flex flex-col gap-1 hover:bg-primary/10 transition-all duration-200 border-b-primary cursor-pointer rounded-md"
            >
              <p className="font-semibold">{list.name}</p>
              {list.books.length > 0 ? (
                <p className="text-muted-foreground text-sm">
                  {list.books.length === 1
                    ? '1 livro'
                    : `${list.books.length} livros`}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Nenhum livro adicionado
                </p>
              )}
            </div>
          ))}
        </>
      ) : (
        <p className="text-center py-4 text-muted-foreground">
          {lists && lists.length === 0
            ? 'Este livro já foi adicionado em todas as suas listas'
            : 'Nenhuma lista encontrada'}
        </p>
      )}
    </div>
  );
};
