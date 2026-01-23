"use client"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"
import { navigation } from "../data/constants"

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className="flex justify-between w-full">
      <div>
        <h1 className="font-bold text-xl">Bookly</h1>
        <p className="text-muted-foreground">Gerencie sua biblioteca pessoal</p>
      </div>

      <nav className="hidden sm:flex bg-card p-2 rounded-lg gap-2 h-fit">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              size="sm"
              variant="ghost"
              className={`${pathname === item.href ? "bg-accent" : ""}`}
            >
              <div className="text-primary">{item.icon}</div>
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </header>
  )
}
