import { DropdownMenu, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { ListType } from '@/src/data/types/books';
import { Plus } from 'lucide-react';
import { ListOptions } from './ListOptions';
import { Drawer, DrawerTrigger } from '@/src/components/ui/drawer';
import { DrawerListOptions } from './DrawerListOptions';

type ListInfoProps = {
  lists: ListType[] | undefined;
  setOpenDrawer: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
  setOpenRemoveBookModal: (open: boolean) => void;
  setListIdToRemove: (id: string) => void;
  openOptionsDrawer: boolean;
  setOpenOptionsDrawer: (open: boolean) => void;
};

export const ListInfo = ({
  lists,
  setOpenDrawer,
  setOpenModal,
  setOpenRemoveBookModal,
  setListIdToRemove,
  openOptionsDrawer,
  setOpenOptionsDrawer,
}: ListInfoProps) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-muted-foreground">
        {lists ? <p>PRESENTE EM</p> : <p>Este livro não está presente em nenhuma lista</p>}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex gap-2 flex-wrap">
      {lists &&
        lists.map((list) => (
          <DropdownMenu dir="rtl" key={list.id}>
            <DropdownMenuTrigger className="hidden sm:flex" asChild>
              <Button variant="outline">{list.name}</Button>
            </DropdownMenuTrigger>
            <ListOptions
              listId={list.id}
              setListIdToRemove={setListIdToRemove}
              setOpenRemoveBookModal={setOpenRemoveBookModal}
            />
          </DropdownMenu>
        ))}

      {lists &&
        lists.map((list) => (
          <Drawer key={list.id} direction="bottom" open={openOptionsDrawer} onOpenChange={setOpenOptionsDrawer}>
            <DrawerTrigger asChild>
              <Button className="sm:hidden" variant="outline">
                {list.name}
              </Button>
            </DrawerTrigger>
            <DrawerListOptions
              listId={list.id}
              listName={list.name}
              setListIdToRemove={setListIdToRemove}
              setOpenOptionsDrawer={setOpenOptionsDrawer}
              setOpenRemoveBookModal={setOpenRemoveBookModal}
            />
          </Drawer>
        ))}

      <Button className="sm:hidden" onClick={() => setOpenDrawer(true)}>
        <Plus /> Adicionar à lista
      </Button>

      <Button className="hidden sm:flex" onClick={() => setOpenModal(true)}>
        <Plus /> Adicionar à lista
      </Button>
    </CardContent>
  </Card>
);
