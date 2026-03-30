"use client";
import { ChatContent } from "../components/ChatContent";
import { IaForm } from "../components/IaForm";
import { Recommendations } from "../components/Recommendations";
import { useBooklyIa } from "../hooks/useBooklyIa";

export const IaPageContent = () => {
  const { userMessage, data, handleSearch, register, handleSubmit, isPending } =
    useBooklyIa();

  return (
    <>
      {userMessage && (
        <ChatContent
          userMessage={userMessage}
          chatMessage={data?.chatResponse}
        />
      )}

      <IaForm
        handleSearch={handleSearch}
        register={register}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
      <Recommendations books={data?.suggestions || []} />
    </>
  );
};
