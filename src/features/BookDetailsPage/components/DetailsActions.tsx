import { Button } from "@/src/components/ui/button"
import { ArrowLeft, Pencil, Trash } from "lucide-react"
import Link from "next/link"

export const DetailsActions = () => (
  <header className="flex justify-between items-center mb-8">
    <Link href="/">
      <Button variant="outline" className="rounded-full w-12 h-12">
        <ArrowLeft className="w-auto h-auto" />
      </Button>
    </Link>

    <div className="flex space-x-4">
      <Button variant="outline" className="rounded-full w-12 h-12">
        <Pencil className="w-auto h-auto" />
      </Button>
      <Button variant="outline" className="rounded-full w-12 h-12">
        <Trash className="w-auto h-auto" />
      </Button>
    </div>
  </header>
)
