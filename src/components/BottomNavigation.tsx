'use client';
import { usePathname } from 'next/navigation';
import { navigationButtons } from '../data/constants';
import Link from 'next/link';

export const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="sm:hidden flex fixed bottom-0 w-full justify-between items-center px-10 py-3 bg-card/80 backdrop-blur-md border-t border-primary/60">
      {navigationButtons.map((item) => (
        <Link href={item.href} key={item.name}>
          <div
            className={`flex flex-col items-center text-muted-foreground space-y-1 ${pathname === item.href ? 'text-primary' : ''}`}
          >
            <item.icon
              className={`text-muted-foreground ${pathname === item.href ? 'text-primary' : ''}`}
            />
            <span className="text-sm">{item.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
