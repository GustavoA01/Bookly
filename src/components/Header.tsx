'use client';
import { Dialog, DialogClose, DialogContent, DialogTitle } from './ui/dialog';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { navigationButtons } from '../data/constants';
import { LogIn } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from './ui/drawer';
import { useState } from 'react';
import { ConfirmLogout } from './ConfirmLogout';
import { useAuth } from '../data/contexts/AuthProvider';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';

export const Header = () => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleLogout = () => setOpenConfirmModal(true);

  return (
    <header className="flex justify-between w-full items-center">
      <div>
        <div className="flex items-center gap-2">
          <Image src="/icon.png" alt="Logo do Bookly" className="rounded-lg" width={50} height={50} />
          <h1 className="font-bold text-xl">Bookly</h1>
        </div>
        <p className="text-muted-foreground">Gerencie sua biblioteca pessoal</p>
      </div>

      <div className="flex gap-2 items-center">
        <nav className="hidden sm:flex bg-card p-2 rounded-lg gap-2 h-fit">
          {navigationButtons.map((item) => (
            <Link key={item.name} href={item.href} title={item.title}>
              <Button size="sm" variant="ghost" className={`${pathname === item.href ? 'bg-accent' : ''}`}>
                <div className="text-primary">{item.icon}</div>
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>

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
      </div>

      <Drawer open={openSheet} onOpenChange={setOpenSheet}>
        <DrawerContent className="p-4">
          <DrawerTitle>{user?.displayName}</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleLogout}>
              <LogIn />
              <p>Sair</p>
            </Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogTitle>{user?.displayName}</DialogTitle>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleLogout}>
              <LogIn />
              <p>Sair</p>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
        <ConfirmLogout setCloseModal={setOpenConfirmModal} />
      </Dialog>
    </header>
  );
};
