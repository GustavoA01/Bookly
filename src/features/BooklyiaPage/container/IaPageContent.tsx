"use client";
import { Skeleton } from "@/src/components/ui/skeleton";
import { ChatContent } from "../components/ChatContent";
import { IaForm } from "../components/IaForm";
import { Recommendations } from "../components/Recommendations";
import { useBooklyIa } from "../hooks/useBooklyIa";

export const IaPageContent = () => {
  const {
    userMessage,
    suggestions,
    handleSearch,
    register,
    handleSubmit,
    isRequestPending,
    chat,
    isChatPending,
  } = useBooklyIa();

  return (
    <>
      {isChatPending && (
        <Skeleton className="w-full sm:max-w-2xl m-auto h-40" />
      )}
      {chat?.messages && (
        <ChatContent messages={chat.messages} temporaryMessage={userMessage} />
      )}
      <IaForm
        handleSearch={handleSearch}
        register={register}
        handleSubmit={handleSubmit}
        isRequestPending={isRequestPending}
      />
      <Recommendations
        books={suggestions ?? []}
        isChatPending={isChatPending}
      />
    </>
  );
};
