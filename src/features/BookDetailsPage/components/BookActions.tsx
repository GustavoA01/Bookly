"use client"
import { Button } from "@/src/components/ui/button"
import { ArrowLeft, Pencil, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

export const BookActions = () => {
  const router = useRouter()
  
  return (
    <header className="flex justify-between items-center mb-8">
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="rounded-full w-12 h-12"
      >
        <ArrowLeft className="w-auto h-auto" />
      </Button>

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
}
