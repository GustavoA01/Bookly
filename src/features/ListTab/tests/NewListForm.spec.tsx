import { render, screen } from "@testing-library/react";
import { NewListForm } from "../container/NewListForm";
import { Dialog } from "@/src/components/ui/dialog";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../../services/firebase/firebaseConfig", () => ({
  auth: {
    currentUser: {
      uid: "test-user-id",
    },
  },
}));

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
  useMutation: () => ({
    mutateAsync: jest.fn(),
  }),
}));

describe("NewListForm", () => {
  it("renders component correctly", () => {
    render(
      <Dialog open>
        <NewListForm />
      </Dialog>,
    );

    expect(screen.getByText("Criar Nova Lista")).toBeInTheDocument();
    expect(
      screen.getByText("Crie listas personalizadas e adicione livros a elas."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });
});
