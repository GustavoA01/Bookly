import { Card } from "@/src/components/ui/card"
import { Plus } from "lucide-react"

export const ListTabContent = () => {
  return (
    <main className="space-x-2 space-y-2 mt-2">
      <Card className="group bg-transparent hover:border-primary border-dashed cursor-pointer transition-all duration-250">
        <div className="m-auto flex flex-col items-center text-muted-foreground text-sm space-y-2">
          <Plus className="group-hover:scale-110 transition-all duration-250 group-hover:text-primary" />
          <p className="group-hover:scale-110 transition-all duration-250 group-hover:text-primary">
            Criar Nova Lista
          </p>
        </div>
      </Card>
      
      <Card className="">

      </Card>
    </main>
  )
}
