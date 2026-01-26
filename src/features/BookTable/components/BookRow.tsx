"use client"
import { Badge } from "../../../components/ui/badge"
import { TableCell, TableRow } from "../../../components/ui/table"
import { useRouter } from "next/navigation"

export const BookRow = () => {
  const router = useRouter()
  return (
    <TableRow
      onClick={() => router.push("/livro/1")}
      className="cursor-pointer group"
    >
      <TableCell className="flex flex-col max-w-md">
        <div className="flex flex-col ml-8">
          <h2 className="group-hover:text-primary transition duration-200 font-bold sm:text-lg whitespace-nowrap">
            O Iluminado
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
            J.R.R. Tolkien
          </p>
          <p className="hidden sm:block text-muted-foreground text-xs">
            21/01/2023
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge>Fantasia</Badge>
      </TableCell>
      <TableCell>Lido</TableCell>
      <TableCell>5</TableCell>
    </TableRow>
  )
}
