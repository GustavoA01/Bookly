import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { CategorySelect } from "../../components/CategorySelect";
import { TabsNav } from "@/src/components/TabsNav";
import { BookTable } from "@/src/features/BookTable/container";
import { ListTabContent } from "@/src/features/ListTab/container/ListTabContent";
import { MobileAddButton } from "@/src/components/MobileAddButton";
import Link from "next/link";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) => {
  const { tab } = await searchParams;

  return (
    <main>
      <TabsNav tab={tab} />

      <div className="sm:flex space-y-2 justify-between">
        <Input placeholder="Pesquisar" className="w-full sm:max-w-80" />

        <div className="flex gap-2">
          <CategorySelect isHome />

          <Link href="/novo-livro">
            <Button className="sm:flex hidden">
              <Plus />
              Novo Livro
            </Button>
          </Link>
        </div>
      </div>

      {!tab || tab === "books" ? (
        <>
          <Link href="/novo-livro">
            <MobileAddButton />
          </Link>
          <BookTable />
        </>
      ) : (
        <ListTabContent />
      )}
    </main>
  );
};

export default Home;
