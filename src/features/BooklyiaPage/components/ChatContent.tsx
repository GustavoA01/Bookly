import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { ChatMessageType } from "@/src/data/types/api";
import { Trash } from "lucide-react";

type ChatContentType = {
  messages: ChatMessageType["messages"];
  temporaryMessage: string;
  setIsDeleteModalOpen: (open: boolean) => void;
  isRequestPending: boolean;
};

export const ChatContent = ({
  messages,
  temporaryMessage,
  setIsDeleteModalOpen,
  isRequestPending,
}: ChatContentType) => (
  <Card className="bg-primary-foreground w-full sm:max-w-2xl m-auto animate-fade-in-title ">
    <CardHeader>
      <CardTitle>Chat</CardTitle>
      <CardAction>
        <Button
          variant="destructive"
          data-testid="delete-chat-button"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent className="flex flex-col gap-4 overflow-y-auto max-h-60">
      {messages.map((message, index) => (
        <span
          key={index}
          className={`text-sm py-2 px-4 rounded-lg ml-${message.sender === "user" ? "auto" : "0"} ${
            message.sender === "user"
              ? "bg-primary/60 rounded-tr-none"
              : "bg-muted text-muted-foreground rounded-tl-none"
          }`}
        >
          {message.text}
        </span>
      ))}
      {temporaryMessage && (
        <span className="ml-auto text-sm py-2 px-4 bg-primary/60 rounded-lg rounded-tr-none">
          {temporaryMessage}
        </span>
      )}
      {isRequestPending && (
        <Skeleton className="mr-auto text-sm py-2 px-4 rounded-lg rounded-tl-none">
          Buscando livros...
        </Skeleton>
      )}
    </CardContent>
  </Card>
);
