import { chatSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useChatMutation } from './useChatMutation';
import { useAuth } from '@/src/data/contexts/AuthProvider';

export const useBooklyIa = () => {
  const { user, isLoading } = useAuth();
  const notLoggedIn = !user && !isLoading;
  const isLoggedIn = user && !isLoading;
  const { register, handleSubmit, reset } = useForm<{ prompt: string }>({
    resolver: zodResolver(chatSchema),
  });

  const {
    chat,
    userTemporaryMessage,
    setUserTemporaryMessage,
    suggestions,
    searchBooks,
    isRequestPending,
    isChatPending,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deleteChatFn,
    isDeletingChat,
  } = useChatMutation();

  const handleSearch = async (data: { prompt: string }) => {
    try {
      reset({ prompt: '' });
      setUserTemporaryMessage(data.prompt);
      await searchBooks(data.prompt);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return {
    handleSearch,
    register,
    handleSubmit,
    isRequestPending,
    suggestions: suggestions.length === 0 ? chat?.suggestions : suggestions,
    userTemporaryMessage,
    chat,
    isChatPending,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deleteChatFn,
    isDeletingChat,
    notLoggedIn,
    isLoggedIn,
  };
};
