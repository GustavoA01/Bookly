import { BooksToAddListProps } from '../types';

export const BooksToAddList = ({
  booksToAdd,
  isBooksToAddLoading,
  addToListFn,
  listId,
}: BooksToAddListProps) => (
  <div className="max-h-64 overflow-y-auto">
    {isBooksToAddLoading ? (
      <p className="text-center py-4 text-muted-foreground">Carregando...</p>
    ) : booksToAdd && booksToAdd.length > 0 ? (
      <>
        {booksToAdd?.map((book) => (
          <div
            key={book.id}
            onClick={() =>
              addToListFn({ listId, bookId: book.id, action: 'add' })
            }
            className="px-4 py-2 flex flex-col gap-1 hover:bg-primary/10 transition-all duration-200 border-b-primary cursor-pointer rounded-md"
          >
            <p className="font-semibold">{book.title}</p>
            {book.author && (
              <p className="text-muted-foreground text-sm">{book.author}</p>
            )}
          </div>
        ))}
      </>
    ) : (
      <p className="text-center py-4 text-muted-foreground">
        Nenhum livro encontrado
      </p>
    )}
  </div>
);
