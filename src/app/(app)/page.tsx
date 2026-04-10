import { TabsNav } from '@/src/components/TabsNav';
import { ListTabContent } from '@/src/features/ListTab/container/ListTabContent';
import { BookTabContent } from '@/src/features/BookTab/container/BookTabContent';

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) => {
  const { tab } = await searchParams;

  return (
    <main>
      <TabsNav tab={tab} />
      {!tab || tab === 'books' ? <BookTabContent /> : <ListTabContent />}
    </main>
  );
};

export default HomePage;
