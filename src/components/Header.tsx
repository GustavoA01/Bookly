"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { navigationButtons } from "../data/constants";
import { LogIn, User } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "./ui/drawer";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./ui/dialog";
import { LogOutButton } from "./LogOutButton";
import { useAuth } from "../contexts/AuthProvider";
import { Skeleton } from "./ui/skeleton";

export const Header = () => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <header className="flex justify-between w-full items-center">
      <div>
        <h1 className="font-bold text-xl">Bookly</h1>
        <p className="text-muted-foreground">Gerencie sua biblioteca pessoal</p>
      </div>

      <div className="flex gap-2 items-center">
        <nav className="hidden sm:flex bg-card p-2 rounded-lg gap-2 h-fit">
          {navigationButtons.map((item) => (
            <Link key={item.name} href={item.href} title={item.title}>
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

        {isLoading ? (
          <Skeleton className="w-10 h-10 rounded-full" />
        ) : user ? (
          <Avatar className="cursor-pointer ">
            <AvatarFallback
              className="sm:hidden"
              onClick={() => setOpenSheet(true)}
            >
              <User size={20} />
            </AvatarFallback>
            <AvatarFallback
              className="hidden sm:flex"
              onClick={() => setOpenModal(true)}
            >
              <User size={20} />
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
            <LogOutButton />
          </DrawerClose>
        </DrawerContent>
      </Drawer>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogTitle>{user?.displayName}</DialogTitle>
          <DialogClose asChild>
            <LogOutButton />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </header>
  );
};
