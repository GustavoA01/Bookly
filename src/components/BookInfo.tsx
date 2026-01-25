import { Star } from "lucide-react"

type BookInfoProps = {
  subtitle: string
  icon?: boolean
  info: string
}

export const BookInfo = ({ subtitle, icon, info }: BookInfoProps) => (
  <div className="flex flex-col sm:space-y-4 items-center">
    <h2 className="text-muted-foreground font-semibold">{subtitle}</h2>
    <div className="flex items-center space-x-2">
      <p>{info}</p>
      {icon && <Star className="fill-primary text-primary max-sm:w-4 max-sm:h-4" />}
    </div>
  </div>
)
