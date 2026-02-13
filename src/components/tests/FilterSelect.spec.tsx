import { fireEvent, render, screen } from "@testing-library/react";
import { FilterSelect } from "../FilterSelect";

describe("FilterSelect", () => {
  it("deve renderizar categorias padrão quando isHome for false", async () => {
    render(<FilterSelect value="" onSelect={jest.fn()} />);

    const button = await screen.findByRole("combobox");
    fireEvent.click(button);

    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Autor")).toBeInTheDocument();
    expect(screen.getByText("Avaliação")).toBeInTheDocument();
    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Fim")).toBeInTheDocument();
    expect(screen.getByText("Criado em")).toBeInTheDocument();
  });

  it("deve renderizar categorias corretas quando isHome for true", async () => {
    render(<FilterSelect value="" onSelect={jest.fn()} />);

    const button = await screen.findByRole("combobox");
    fireEvent.click(button);

    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Autor")).toBeInTheDocument();
    expect(screen.getByText("Avaliação")).toBeInTheDocument();
    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Fim")).toBeInTheDocument();
    expect(screen.getByText("Criado em")).toBeInTheDocument();
  });
});
