import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ConfirmLogout } from "../ConfirmLogout";
import { Dialog } from "../ui/dialog";
import { auth } from "../../services/firebase/firebaseConfig";

const mockQueryClearFn = jest.fn();
jest.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    clear: mockQueryClearFn,
  }),
}));

jest.mock("../../services/firebase/firebaseConfig", () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

describe("ConfirmLogout", () => {
  it("renders the component correctly", async () => {
    (auth.signOut as jest.Mock).mockResolvedValue(null);

    const mockSetCloseModal = jest.fn();
    render(
      <Dialog open>
        <ConfirmLogout setCloseModal={mockSetCloseModal} />
      </Dialog>,
    );

    const logOutButton = screen.getAllByText("Sair")[1];
    fireEvent.click(logOutButton);

    await waitFor(() => {
      expect(auth.signOut).toHaveBeenCalled();
    });

    expect(logOutButton).toBeInTheDocument();
    expect(mockQueryClearFn).toHaveBeenCalled();
    expect(mockSetCloseModal).toHaveBeenCalledWith(false);
    expect(
      screen.getByText("Tem certeza que deseja sair da conta?"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cancelar/i }),
    ).toBeInTheDocument();
  });
});
