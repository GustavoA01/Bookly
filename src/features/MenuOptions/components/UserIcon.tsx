import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { Skeleton } from '@/src/components/ui/skeleton';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { UserIconProps } from '../types';

export const UserIcon = ({
  user,
  isLoading,
  setOpenSheet,
  setOpenModal,
}: UserIconProps) => (
  <>
    {isLoading ? (
      <Skeleton className="w-10 h-10 rounded-full" />
    ) : user ? (
      <Avatar className="cursor-pointer ">
        <AvatarFallback
          className="sm:hidden"
          onClick={() => setOpenSheet(true)}
        >
          <p>{user?.displayName?.charAt(0).toUpperCase()}</p>
        </AvatarFallback>
        <AvatarFallback
          className="hidden sm:flex"
          onClick={() => setOpenModal(true)}
        >
          <p>{user?.displayName?.charAt(0).toUpperCase()}</p>
        </AvatarFallback>
      </Avatar>
    ) : (
      <Link href="/login" title="Fazer login">
        <Button variant="outline">
          <LogIn />
          <p>Entrar</p>
        </Button>
      </Link>
    )}
  </>
);
