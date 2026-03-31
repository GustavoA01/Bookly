import { Card, CardContent } from "@/src/components/ui/card";

type ChatContentType = {
  messages: { sender: "user" | "bot"; text: string; timestamp: Date }[];
  temporaryMessage: string;
};

export const ChatContent = ({
  messages,
  temporaryMessage,
}: ChatContentType) => (
  <Card className="bg-primary-foreground overflow-y-auto max-h-60 w-full sm:max-w-2xl m-auto animate-fade-in-title ">
    <CardContent className="flex flex-col gap-4">
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
