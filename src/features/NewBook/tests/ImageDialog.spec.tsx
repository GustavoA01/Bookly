import { Dialog } from "@/src/components/ui/dialog";
import { render, screen } from "@testing-library/react";
import { ImageDialog } from "../components/ImageDialog";

describe("ImageDialog", () => {
  it("renders component correctly", () => {
    render(
      <Dialog open>
        <ImageDialog />
      </Dialog>,
    );

    expect(screen.getByText("Adicionar Capa do Livro")).toBeInTheDocument();
    expect(
      screen.getByText("Faça upload de uma imagem ou cole uma URL da web"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ex: https://...")).toBeInTheDocument();
    expect(screen.getByText("Selecionar Imagem")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
    expect(document.querySelector("#select-image")).toHaveAttribute(
      "type",
      "file",
    );
  });
});
