import { Status, StatusPropsType } from './types/books';
import { BadgeCheck, BadgeX, BookOpen, Clock, Compass, Home, Sparkles } from 'lucide-react';

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
    icon: <Home className="max-sm:h-5 max-sm:w-5" />,
  },
  {
    name: 'Explorar',
    title: 'Explorar livros',
    href: '/explorar',
    icon: <Compass className="max-sm:h-5 max-sm:w-5" />,
  },
  {
    name: 'Bookly IA',
    title: 'Descobrir com IA',
    href: '/bookly-ia',
    icon: <Sparkles className="max-sm:h-5 max-sm:w-5" />,
  },
];

export const statusColors: Record<Status, StatusPropsType> = {
  reading: {
    bgColor: 'primary/15',
    textColor: 'primary',
    label: 'Lendo',
    icon: <BookOpen size={14} />,
  },
  read: {
    bgColor: 'green-500/15',
    textColor: 'green-500',
    label: 'Lido',
    icon: <BadgeCheck size={14} />,
  },
  toRead: {
    bgColor: 'yellow-500/15',
    textColor: 'yellow-500',
    label: 'Quero ler',
    icon: <Clock size={14} />,
  },
  abandoned: {
    bgColor: 'red-400/15',
    textColor: 'red-400',
    label: 'Abandonado',
    icon: <BadgeX size={14} />,
  },
};
