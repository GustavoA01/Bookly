'use client';
import { Skeleton } from '@/src/components/ui/skeleton';
import { ChatContent } from '../components/ChatContent';
import { IaForm } from '../components/IaForm';
import { Recommendations } from '../components/Recommendations';
import { useBooklyIa } from '../hooks/useBooklyIa';
import { Dialog } from '@/src/components/ui/dialog';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
      {isLoggedIn && isChatPending && <Skeleton className="w-full sm:max-w-2xl m-auto h-40" />}

      {chat?.messages && (
        <ChatContent
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          messages={chat.messages}
          temporaryMessage={userTemporaryMessage}
          isRequestPending={isRequestPending}
        />
      )}
      {notLoggedIn && (
        <div className="text-center mt-10 space-y-4 animate-fade-in-title">
          <p className="text-lg text-muted-foreground">Faça login para acessar os recursos da IA.</p>
          <Link href="/login">
            <Button>
              <p>Ir para login</p>
              <ArrowRight />
            </Button>
          </Link>
        </div>
      )}

      <IaForm
        handleSearch={handleSearch}
        register={register}
        handleSubmit={handleSubmit}
        isRequestPending={isRequestPending}
        notLoggedIn={notLoggedIn}
      />
      {chat && (
        <>
          <Recommendations books={suggestions ?? []} isChatPending={isChatPending} />
          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <ConfirmDeleteModal chat={chat} deleteChatFn={deleteChatFn} isDeletingChat={isDeletingChat} />
          </Dialog>
        </>
      )}
    </>
  );
};
