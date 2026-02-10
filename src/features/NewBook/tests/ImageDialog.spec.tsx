import { Dialog } from "@/src/components/ui/dialog";
import { render, screen } from "@testing-library/react";
import { ImageDialog } from "../components/ImageDialog";

jest.mock("react-hook-form", () => ({
  useFormContext: () => ({
    register: jest.fn(),
  }),
}));

describe("ImageDialog", () => {
  it("renders component correctly", () => {
    render(
      <Dialog open>
        <ImageDialog
          choosedFile={undefined}
          setChoosedFile={jest.fn()}
          handleFileChange={jest.fn()}
          chooseImageError={null}
          showImage={false}
        />
      </Dialog>,
    );

    expect(screen.getByText("Adicionar Imagem do Livro")).toBeInTheDocument();
    expect(
      screen.getByText("Faça upload de uma imagem ou cole uma URL da web"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ex: https://...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
    expect(document.querySelector("#select-image")).toHaveAttribute(
      "type",
      "file",
    );
  });
});
