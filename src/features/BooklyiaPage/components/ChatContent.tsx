import { Card, CardContent } from "@/src/components/ui/card";

type ChatContentType = {
  userMessage: string;
  chatMessage?: string;
};

export const ChatContent = ({ userMessage, chatMessage }: ChatContentType) => (
  <Card className="bg-primary-foreground overflow-y-auto max-h-60 w-full sm:max-w-2xl m-auto animate-fade-in-title ">
    <CardContent className="flex flex-col gap-4">
      <span className="ml-auto text-sm py-2 px-4 bg-primary/60 rounded-lg rounded-tr-none">
        {userMessage}
      </span>
      {chatMessage && <p className="text-muted-foreground">{chatMessage}</p>}
    </CardContent>
  </Card>
);
