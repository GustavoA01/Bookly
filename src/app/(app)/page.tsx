import { TabsNav } from '@/src/components/TabsNav';
import { ListTabContent } from '@/src/features/ListTab/container/ListTabContent';
import { BookTabContent } from '@/src/features/BookTab/container/BookTabContent';

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) => {
  const { tab } = await searchParams;
  const isBooksTab = !tab || tab === 'books';

  return (
    <main
      className={
        isBooksTab
          ? 'flex h-[calc(100dvh-10rem)] min-h-0 flex-col overflow-hidden max-sm:h-[calc(100dvh-12rem)]'
          : undefined
      }
    >
      <TabsNav tab={tab} />
      {isBooksTab ? <BookTabContent /> : <ListTabContent />}
    </main>
  );
};

export default HomePage;
