"use client"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"
import { Compass, Home, Sparkle } from "lucide-react"

const navigation = [
  { name: "Início", href: "/", icon: <Home className="text-primary" /> },
  { name: "Explorar", href: "/explorar", icon: <Compass className="text-primary" /> },
  { name: "Bookly IA", href: "/bookly-ia", icon: <Sparkle className="text-primary" /> },
]

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className="flex justify-between w-full">
      <div>
        <h1 className="font-bold text-xl">Bookly</h1>
        <p className="text-muted-foreground">Gerencie sua biblioteca pessoal</p>
      </div>

      <nav className="hidden sm:flex bg-card p-2 rounded-lg gap-2 h-fit">
        {navigation.map((item, index) => (
          <Link key={item.name} href={item.href}>
            <Button
              size="sm"
              variant="ghost"
              className={`${pathname === item.href ? "bg-accent" : ""}`}
            >
              {item.icon}
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </header>
  )
}
