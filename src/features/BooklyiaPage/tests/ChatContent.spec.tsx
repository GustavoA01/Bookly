import { ChatMessageType } from "@/src/data/types/api";
import { ChatContent } from "../components/ChatContent";
import { fireEvent, render, screen } from "@testing-library/react";

HTMLElement.prototype.scrollTo = jest.fn();

const mockMessages: ChatMessageType["messages"] = [
  { sender: "user", text: "Hello", timestamp: new Date() },
  { sender: "bot", text: "Hi there!", timestamp: new Date() },
];

describe("ChatContent", () => {
  it("should render component with correct props", () => {
    const deleteChatFn = jest.fn();
    render(
      <ChatContent
        messages={mockMessages}
        setIsDeleteModalOpen={deleteChatFn}
        temporaryMessage="Mock Temporário"
        isRequestPending
      />,
    );

    const deleteButton = screen.getByTestId("delete-chat-button");

    fireEvent.click(deleteButton);
    screen.getByText("Hello");
    screen.getByText("Hi there!");
    screen.getByText("Mock Temporário");
    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(screen.getByText("Buscando livros...")).toBeInTheDocument();
    expect(deleteChatFn).toHaveBeenCalled();
  });

  it("should render searching books message", () => {
    render(
      <ChatContent
        messages={mockMessages}
        setIsDeleteModalOpen={jest.fn()}
        temporaryMessage=""
        isRequestPending={false}
      />,
    );

    expect(screen.queryByText("Buscando livros...")).not.toBeInTheDocument();
  });
});
