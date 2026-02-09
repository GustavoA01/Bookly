import { render, screen } from "@testing-library/react";
import { NewBookHeader } from "../container/NewBookHeader";

const goBackFn = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: goBackFn,
  }),
}));

describe("NewBookHeader", () => {
  it("renders component correctly", () => {
    render(<NewBookHeader />);

    const backButton = screen.getByTestId("back-button");
    backButton.click();

    expect(goBackFn).toHaveBeenCalled();
    expect(screen.getByText("Adicionar Novo Livro")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });
});
