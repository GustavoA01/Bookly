'use client';
import { Skeleton } from '@/src/components/ui/skeleton';
import { ChatContent } from './ChatContent';
import { IaForm } from '../components/IaForm';
import { Recommendations } from '../components/Recommendations';
import { useBooklyIa } from '../hooks/useBooklyIa';
import { Dialog } from '@/src/components/ui/dialog';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import { DoLoginCard } from '../components/DoLoginCard';

export const IaPageContent = () => {
  const {
    userTemporaryMessage,
    suggestions,
    handleSearch,
    register,
    handleSubmit,
    isRequestPending,
    chat,
    isChatPending,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deleteChatFn,
    isDeletingChat,
    notLoggedIn,
    isLoggedIn,
  } = useBooklyIa();

  return (
    <>
      {isLoggedIn && isChatPending && (
        <Skeleton className="w-full sm:max-w-2xl m-auto h-40" />
      )}

      {chat?.messages && (
        <ChatContent
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          messages={chat.messages}
          temporaryMessage={userTemporaryMessage}
          isRequestPending={isRequestPending}
        />
      )}

      {notLoggedIn && <DoLoginCard />}

      <IaForm
        handleSearch={handleSearch}
        register={register}
        handleSubmit={handleSubmit}
        isRequestPending={isRequestPending}
        notLoggedIn={notLoggedIn}
      />

      {chat && (
        <>
          <Recommendations
            books={suggestions ?? []}
            isChatPending={isChatPending}
          />
          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <ConfirmDeleteModal
              chat={chat}
              deleteChatFn={deleteChatFn}
              isDeletingChat={isDeletingChat}
            />
          </Dialog>
        </>
      )}
    </>
  );
};
