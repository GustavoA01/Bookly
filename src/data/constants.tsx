import {
  BadgeCheck,
  BadgeX,
  BookOpen,
  Clock,
  Compass,
  Home,
  Sparkles,
} from "lucide-react";
import { Status, StatusPropsType } from "./types/books";

export const navigationButtons = [
  {
    name: "Início",
    href: "/",
    icon: <Home className="max-sm:h-5 max-sm:w-5" />,
  },
  {
    name: "Explorar",
    href: "/explorar",
    icon: <Compass className="max-sm:h-5 max-sm:w-5" />,
  },
  {
    name: "Bookly IA",
    href: "/bookly-ia",
    icon: <Sparkles className="max-sm:h-5 max-sm:w-5" />,
  },
];

export const statusColors: Record<Status, StatusPropsType> = {
  reading: {
    bgColor: "primary/15",
    textColor: "primary",
    label: "Lendo",
    icon: <BookOpen size={14} />,
  },
  read: {
    bgColor: "green-500/15",
    textColor: "green-500",
    label: "Lido",
    icon: <BadgeCheck size={14} />,
  },
  toRead: {
    bgColor: "yellow-500/15",
    textColor: "yellow-500",
    label: "Quero ler",
    icon: <Clock size={14} />,
  },
  abandoned: {
    bgColor: "red-400/15",
    textColor: "red-400",
    label: "Abandonado",
    icon: <BadgeX size={14} />,
  },
};
