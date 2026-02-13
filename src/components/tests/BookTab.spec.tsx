import { render, screen } from "@testing-library/react";
import { BookTab } from "../BookTab";

describe("BookTab", () => {
  it("renders the component correctly", () => {
    render(<BookTab />);

    expect(screen.getByPlaceholderText("Pesquisar")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Novo Livro");
  });

  it("has correct link for new book", () => {
    render(<BookTab />);

    const link = screen.getByRole("link", { name: /Novo Livro/i });
    expect(link).toHaveAttribute("href", "/novo-livro");
  });

  it("renders CategorySelect", () => {
    render(<BookTab />);

    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders FilterSelect", () => {
    render(<BookTab />);

    expect(screen.getByText("Filtrar")).toBeInTheDocument();
  });

  it("verifies if button is hidden in small screens", () => {
    render(<BookTab />);

    const button = screen.getByRole("button", { name: /Novo Livro/i });
    expect(button.className).toMatch(/hidden sm:flex/);
  });
});
