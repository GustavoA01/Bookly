import { BottomNavigation } from '@/src/components/BottomNavigation';
import { Header } from '@/src/components/Header';

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <main className="flex flex-col space-y-2 min-h-screen container mx-auto py-8 xl:px-8 max-sm:px-4">
      <Header />
      {children}
    </main>
    <BottomNavigation />
  </div>
);

export default AppLayout;
