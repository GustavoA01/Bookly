import { render, screen } from "@testing-library/react";
import { BookTHeader } from "../components/BookTHeader";

describe("BookTHeader", () => {
  it("renders component correctly", () => {
    render(<BookTHeader />);

    expect(screen.getByText("Livro")).toBeInTheDocument();
    expect(screen.getByText("Gênero")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Nota")).toBeInTheDocument();
  });
});
