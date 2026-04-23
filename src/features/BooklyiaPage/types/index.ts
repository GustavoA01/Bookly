import { ChatMessageType, GoogleBookItem } from '@/src/data/types/api';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

export type RecommendationsProps = {
  isChatPending: boolean;
  books: GoogleBookItem[];
};

export type IaFormType = {
  handleSubmit: UseFormHandleSubmit<{ prompt: string }>;
  handleSearch: (data: { prompt: string }) => Promise<void>;
  register: UseFormRegister<{ prompt: string }>;
  isRequestPending: boolean;
  notLoggedIn: boolean;
};

export type ConfirmDeleteModalProps = {
  chat: ChatMessageType;
  deleteChatFn: (chatId: string) => Promise<void>;
  isDeletingChat: boolean;
};

export type ChatContentProps = {
  messages: ChatMessageType['messages'];
  temporaryMessage: string;
  setIsDeleteModalOpen: (open: boolean) => void;
  isRequestPending: boolean;
};
