import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Trash } from "lucide-react";

type ChatContentType = {
  messages: { sender: "user" | "bot"; text: string; timestamp: Date }[];
  temporaryMessage: string;
  setIsDeleteModalOpen: (open: boolean) => void;
};

export const ChatContent = ({
  messages,
  temporaryMessage,
  setIsDeleteModalOpen,
}: ChatContentType) => (
  <Card className="bg-primary-foreground w-full sm:max-w-2xl m-auto animate-fade-in-title ">
    <CardHeader>
      <CardTitle>Chat</CardTitle>
      <CardAction>
        <Button
          variant="destructive"
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
          className={`ml-${message.sender === "user" ? "auto" : "0"} text-sm py-2 px-4 ${
            message.sender === "user"
              ? "bg-primary/60"
              : "bg-muted text-muted-foreground"
          } rounded-lg rounded-tr-none`}
        >
          {message.text}
        </span>
      ))}
      {temporaryMessage && (
        <span className="ml-auto text-sm py-2 px-4 bg-primary/60 rounded-lg rounded-tr-none">
          {temporaryMessage}
        </span>
      )}
    </CardContent>
  </Card>
);
