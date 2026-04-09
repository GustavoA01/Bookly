import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { Skeleton } from '@/src/components/ui/skeleton';
import { User } from 'firebase/auth';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

type MenuProps = {
  user: User | null;
  isLoading: boolean;
  setOpenSheet: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
};

export const UserIcon = ({ user, isLoading, setOpenSheet, setOpenModal }: MenuProps) => (
  <>
    {isLoading ? (
      <Skeleton className="w-10 h-10 rounded-full" />
    ) : user ? (
      <Avatar className="cursor-pointer ">
        <AvatarFallback className="sm:hidden" onClick={() => setOpenSheet(true)}>
          <p>{user?.displayName?.charAt(0).toUpperCase()}</p>
        </AvatarFallback>
        <AvatarFallback className="hidden sm:flex" onClick={() => setOpenModal(true)}>
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
