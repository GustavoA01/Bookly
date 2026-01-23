import { Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { CategorySelect } from "../components/CategorySelect"

export default function Home() {
  return (
      <main>
        <div className="sm:flex space-y-2 justify-between">
          <Input placeholder="Pesquisar" className="w-full sm:max-w-80" />

          <div className="flex gap-2">
            <CategorySelect/>
            <Button className="sm:flex hidden">
              <Plus />
              Novo Livro
            </Button>
            <Button className="sm:hidden fixed z-10 right-5 bottom-20 rounded-full w-12 h-12">
              <Plus />
            </Button>
          </div>
        </div>
      </main>
  )
}
