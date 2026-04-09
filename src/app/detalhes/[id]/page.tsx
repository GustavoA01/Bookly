import { BackButton } from '@/src/components/BackButton';
import { GoogleBookItem } from '@/src/data/types/api';
import { BookDetails } from '@/src/features/BookDetailsPage/container/BookDetails';

const GoogleDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const book = (await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then((res) =>
    res.json()
  )) as GoogleBookItem;

  return (
    <div className="space-y-8">
      <BackButton />
      <BookDetails
        id={book.id}
        title={book.volumeInfo.title ?? 'Título Indisponível'}
        author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconhecido'}
        genre={book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'Desconhecido'}
        imageUrl={book.volumeInfo.imageLinks?.thumbnail || '/img-placeholder.jpg'}
        totalPages={book.volumeInfo.pageCount || null}
        currentPage={null}
        rating={book.volumeInfo.averageRating || null}
        synopsis={book.volumeInfo.description || null}
        startDate={null}
        endDate={null}
        comment={null}
        buyLink={book.saleInfo?.buyLink || undefined}
        publisher={book.volumeInfo.publisher || undefined}
        country={book.saleInfo?.country || undefined}
        language={book.volumeInfo.language || undefined}
      />
    </div>
  );
};

export default GoogleDetailsPage;
