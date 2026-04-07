import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChatMessageType } from "@/src/data/types/api";
import { Dialog } from "@/src/components/ui/dialog";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

describe("ConfirmDeleteModal", () => {
  const mockChat = {
    id: "chat-123",
  } as ChatMessageType;

  const mockDeleteChatFn = jest.fn();

  const renderComponent = () => {
    render(
      <Dialog open>
        <ConfirmDeleteModal
          chat={mockChat}
          deleteChatFn={mockDeleteChatFn}
          isDeletingChat={false}
        />
      </Dialog>,
    );
  };

  it("should render delete modal correctly", () => {
    renderComponent();

    expect(screen.getByText("Excluir Conversa")).toBeInTheDocument();
    expect(
      screen.getByText("Tem certeza que deseja deletar a conversa?"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Excluir" })).toBeInTheDocument();
  });

  it("should call delete chat function when clicking on button", async () => {
    renderComponent();

    const deleteButton = screen.getByRole("button", { name: "Excluir" });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteChatFn).toHaveBeenCalledWith(mockChat.id);
    });
  });
});
