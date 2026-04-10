import { Button } from '@/src/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { ChatMessageType } from '@/src/data/types/api';

type ConfirmDeleteModalProps = {
  chat: ChatMessageType;
  deleteChatFn: (chatId: string) => Promise<void>;
  isDeletingChat: boolean;
};

export const ConfirmDeleteModal = ({
  chat,
  deleteChatFn,
  isDeletingChat,
}: ConfirmDeleteModalProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Excluir Conversa</DialogTitle>
      <DialogDescription>
        Tem certeza que deseja deletar a conversa?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button variant="destructive" onClick={() => deleteChatFn(chat.id)}>
        {isDeletingChat ? 'Excluindo...' : 'Excluir'}
      </Button>
    </DialogFooter>
  </DialogContent>
);
