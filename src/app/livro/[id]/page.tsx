import { BookActions } from "@/src/features/BookDetailsPage/components/BookActions"
import { BookHeader } from "@/src/features/BookDetailsPage/components/BookHeader"
import { BookInfo } from "@/src/features/BookDetailsPage/components/BookInfo"
import { BookSinopse } from "@/src/features/BookDetailsPage/components/BookSinopse"
import Image from "next/image"

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  // const {id} = await params

  const mockImage = "/detalhes-mock.jpg"

  return (
    <div>
      <BookActions />

      <main className="flex flex-col justify-center">
        {mockImage && (
          <Image
            className="m-auto sm:hidden max-sm:mb-4 max-h-max"
            src={mockImage}
            alt="Book cover"
            width={250}
            height={350}
          />
        )}

        <div className="flex space-x-8 justify-center">
          {mockImage && (
            <Image
              className="hidden sm:block max-sm:mb-4 max-h-max"
              src={mockImage}
              alt="Book cover"
              width={250}
              height={350}
            />
          )}

          <BookHeader />
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-3 mt-8 space-x-4">
          <BookSinopse />
          <BookInfo />
        </div>
      </main>
    </div>
  )
}

export default DetailsPage
