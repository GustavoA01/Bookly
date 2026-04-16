'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { navigationButtons } from '../data/constants';
import { useState } from 'react';
import Image from 'next/image';
import { UserIcon } from '../features/MenuOptions/components/UserIcon';
import { Menu } from '../features/MenuOptions/container/Menu';
import { useAuth } from '../data/contexts/AuthProvider';

export const Header = () => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <header className="flex justify-between w-full items-center">
      <div>
        <div className="flex items-center gap-2">
          <Image
            src="/icon.png"
            alt="Logo do Bookly"
            className="rounded-lg"
            width={50}
            height={50}
          />
          <h1 className="font-bold text-xl">Bookly</h1>
        </div>
        <p className="text-muted-foreground">Gerencie sua biblioteca pessoal</p>
      </div>

      <div className="flex gap-2 items-center">
        <nav className="hidden sm:flex bg-card p-2 rounded-lg gap-2 h-fit">
          {navigationButtons.map((item) => (
            <Link key={item.name} href={item.href} title={item.title}>
              <Button
                size="sm"
                variant="ghost"
                className={`${pathname === item.href ? 'bg-accent' : ''}`}
              >
                <item.icon className="text-primary max-sm:h-5 max-sm:w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
        <UserIcon
          user={user}
          isLoading={isLoading}
          setOpenSheet={setOpenSheet}
          setOpenModal={setOpenModal}
        />
      </div>

      <Menu
        user={user}
        openSheet={openSheet}
        openModal={openModal}
        setOpenSheet={setOpenSheet}
        setOpenModal={setOpenModal}
      />
    </header>
  );
};
