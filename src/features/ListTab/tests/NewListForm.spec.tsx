import { render, screen } from "@testing-library/react";
import { NewListForm } from "../components/NewListForm";
import { Dialog } from "@/src/components/ui/dialog";

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
