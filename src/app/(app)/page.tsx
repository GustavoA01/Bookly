import { TabsNav } from "@/src/components/TabsNav";
import { BookTable } from "@/src/features/BookTable/container";
import { ListTabContent } from "@/src/features/ListTab/container/ListTabContent";
import { MobileAddButton } from "@/src/components/MobileAddButton";
import { BookTab } from "@/src/components/BookTab";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) => {
  const { tab } = await searchParams;

  return (
    <main>
      <TabsNav tab={tab} />

      {!tab || tab === "books" ? (
        <>
          <BookTab />
          <BookTable />
          <MobileAddButton />
        </>
      ) : (
        <ListTabContent />
      )}
    </main>
  );
};

export default Home;
