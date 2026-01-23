import { Compass, Home, Sparkles } from "lucide-react";

export const navigation = [
  { name: "Início", href: "/", icon: <Home className="max-sm:h-5 max-sm:w-5"/> },
  { name: "Explorar", href: "/explorar", icon: <Compass className="max-sm:h-5 max-sm:w-5" /> },
  { name: "Bookly IA", href: "/bookly-ia", icon: <Sparkles className="max-sm:h-5 max-sm:w-5" /> },
]