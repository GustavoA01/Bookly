import { Card, CardContent } from "@/src/components/ui/card"
import { BookOpen, PencilLine } from "lucide-react"

export const BookSinopse = () => (
  <div className="col-span-2 space-y-4">
    <section>
      <div className="flex items-center gap-2">
        <BookOpen className="text-primary" />
        <h1 className="font-montserrat text-xl font-bold">Sinopse</h1>
      </div>

      <Card className="bg-transparent border border-border mt-4 p-6">
        <CardContent className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          tempora, architecto beatae consequuntur, quae enim natus possimus
          obcaecati praesentium illum quas voluptate dolorem nostrum adipisci
          reiciendis illo voluptates, fuga dolor? Ab, praesentium labore
          consequatur tempora odio a quas pariatur laboriosam sint quo sed
          molestiae ullam modi saepe debitis in. Dolorem quae similique non?
          Voluptatum necessitatibus dolorum, rerum officia laudantium voluptas.
          Delectus, iure quibusdam? Ipsam hic exercitationem quos iste natus?
          Sint provident ad beatae doloremque a, vitae consectetur nostrum
          fugit! Quis distinctio nemo impedit nisi eum voluptas, cupiditate
          similique magnam modi? Nesciunt suscipit molestias minima totam ipsa
          natus at! Quidem in rem voluptate deserunt doloribus fugit ut
          dignissimos, cupiditate, possimus totam quibusdam eaque, optio sequi
          aliquid commodi iusto voluptatibus alias voluptates! Explicabo non
          sequi ab asperiores dicta in quidem quod nesciunt commodi dolor
          sapiente quibusdam quae distinctio magnam ips
        </CardContent>
      </Card>
    </section>

    <section>
      <div className="flex items-center gap-2">
        <PencilLine className="text-primary" />
        <h1 className="font-montserrat text-xl font-bold">Comentário</h1>
      </div>
      <Card className="bg-transparent border border-border mt-4 p-6">
        <CardContent className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          tempora, architecto beatae consequuntur, quae enim natus possimus
          obcaecati praesentium illum quas voluptate dolorem nostrum adipis
        </CardContent>
      </Card>
    </section>
  </div>
)
