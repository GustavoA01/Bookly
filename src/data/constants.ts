import {
  BadgeCheck,
  BadgeX,
  BookOpen,
  Clock,
  Compass,
  Home,
  Sparkles,
} from 'lucide-react';
import { Status, StatusPropsType } from './types/books';

export const filterOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'title', label: 'Título' },
  { value: 'author', label: 'Autor' },
  { value: 'rating', label: 'Avaliação' },
  { value: 'startDate', label: 'Início' },
  { value: 'endDate', label: 'Fim' },
  { value: 'createdAt', label: 'Criado em' },
];

export const defaultStatus = [
  { value: 'read', label: 'Lido' },
  { value: 'reading', label: 'Lendo' },
  { value: 'abandoned', label: 'Abandonado' },
  { value: 'toRead', label: 'Para ler' },
];

export const navigationButtons = [
  {
    name: 'Início',
    title: 'Ir para início',
    href: '/',
    icon: Home,
  },
  {
    name: 'Explorar',
    title: 'Explorar livros',
    href: '/explorar',
    icon: Compass,
  },
  {
    name: 'Bookly IA',
    title: 'Descobrir com IA',
    href: '/bookly-ia',
    icon: Sparkles,
  },
];

export const statusColors: Record<Status, StatusPropsType> = {
  reading: {
    bgColor: 'primary/15',
    textColor: 'primary',
    label: 'Lendo',
    icon: BookOpen,
  },
  read: {
    bgColor: 'green-500/15',
    textColor: 'green-500',
    label: 'Lido',
    icon: BadgeCheck,
  },
  toRead: {
    bgColor: 'yellow-500/15',
    textColor: 'yellow-500',
    label: 'Quero ler',
    icon: Clock,
  },
  abandoned: {
    bgColor: 'red-400/15',
    textColor: 'red-400',
    label: 'Abandonado',
    icon: BadgeX,
  },
};
