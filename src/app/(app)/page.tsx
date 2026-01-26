import { LibraryBig, List, Plus } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { CategorySelect } from "../../components/CategorySelect"
import { TableBook } from "../../features/BookTable/container/TableBook"
import Link from "next/link"
import { TabsNav } from "@/src/components/TabsNav"
import { Card } from "@/src/components/ui/card"

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) => {
  const { tab } = await searchParams

  return (
    <main>
      <TabsNav tab={tab} />

      <div className="sm:flex space-y-2 justify-between">
        <Input placeholder="Pesquisar" className="w-full sm:max-w-80" />

        <div className="flex gap-2">
          <CategorySelect />
          <Button className="sm:flex hidden">
            <Plus />
            Novo Livro
          </Button>

          <Button className="sm:hidden fixed z-10 right-5 bottom-20 rounded-full w-12 h-12">
            <Plus />
          </Button>
        </div>
      </div>

      {!tab || tab === "books" ? (
        <TableBook />
      ) : (
        <main className="mt-2">
          <Card className="group bg-transparent hover:border-primary border-dashed cursor-pointer transition-all duration-250">
            <div className="m-auto flex flex-col items-center text-muted-foreground text-sm space-y-2">
              <Plus className="group-hover:scale-110 transition-all duration-250 group-hover:text-primary" />
              <p className="group-hover:scale-110 transition-all duration-250 group-hover:text-primary">
                Criar Nova Lista
              </p>
            </div>
          </Card>
        </main>
      )}
    </main>
  )
}

export default Home
