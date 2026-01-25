import { BookInfo } from "@/src/components/BookInfo"
import { Badge } from "@/src/components/ui/badge"
import { Separator } from "@/src/components/ui/separator"
import { BookOpen, Star } from "lucide-react"
import Image from "next/image"

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  // const {id} = await params

  const mockImage = "/detalhes-mock.jpg"

  return (
    <div className="flex max-sm:flex-col space-x-4 justify-center">
      {mockImage && (
        <Image className="max-sm:m-auto max-sm:mb-4" src={mockImage} alt="Book cover" width={250} height={350} />
      )}

      <header>
        <div className="max-sm:flex max-sm:flex-col items-center space-y-2">
          <Badge variant="outline" className="flex items-center text-primary">
            <BookOpen />
            <p className="">Lendo</p>
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold font-montserrat">
            O Senhor dos Anéis
          </h1>
          <p className="text-muted-foreground font-montserrat">
            J.R.R. Tolkien
          </p>
        </div>
        <Separator className="my-4" />

        <div className="flex gap-4 justify-center ">
          <BookInfo subtitle="NOTA" icon info="90" />

          <Separator orientation="vertical" />
          <BookInfo subtitle="GÊNERO" info="Fantasia" />

          <Separator orientation="vertical" />
          <BookInfo subtitle="PÁGINAS" info="2024" />
        </div>
      </header>
    </div>
  )
}

export default DetailsPage
