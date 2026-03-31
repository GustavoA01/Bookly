"use client";
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
    isPending,
    chat,
  } = useBooklyIa();

  return (
    <>
      {chat?.messages && (
        <ChatContent messages={chat.messages} temporaryMessage={userMessage} />
      )}

      <IaForm
        handleSearch={handleSearch}
        register={register}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
      <Recommendations books={suggestions} />
    </>
  );
};
