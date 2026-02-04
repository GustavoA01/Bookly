import { TabsNav } from "@/src/components/TabsNav";
import { BookTable } from "@/src/features/BookTable/container";
import { ListTabContent } from "@/src/features/ListTab/container/ListTabContent";
import { MobileAddButton } from "@/src/components/MobileAddButton";
import Link from "next/link";
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
          <Link href="/novo-livro">
            <MobileAddButton />
          </Link>
        </>
      ) : (
        <ListTabContent />
      )}
    </main>
  );
};

export default Home;
