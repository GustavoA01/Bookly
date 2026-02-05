import { render, screen } from "@testing-library/react";
import { SearchBookCard } from "../SearchBookCard";

describe("SearchBookCard", () => {
  it("renders the component correctly", () => {
    render(
      <SearchBookCard
        title="Senhor dos Anéis"
        rating={4.8}
        author="J.R.R. Tolkien"
        genre="Fantasia"
        imageUrl="/mockImage.jpg"
      />,
    );
    const image = screen.getByAltText(
      "Capa do livro Senhor dos Anéis",
    ) as HTMLImageElement;

    expect(image).toHaveAttribute(
      "src",
      "/_next/image?url=%2FmockImage.jpg&w=640&q=75",
    );
    expect(screen.getByText("Senhor dos Anéis")).toBeInTheDocument();
    expect(screen.getByText("J.R.R. Tolkien")).toBeInTheDocument();
    expect(screen.getByText("Fantasia")).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
  });

  it("has a button to add to library", () => {
    render(
      <SearchBookCard
        title="Senhor dos Anéis"
        rating={4.8}
        author="J.R.R. Tolkien"
        genre="Fantasia"
        imageUrl="/mockImage.jpg"
      />,
    );
    const button = screen.getByRole("button", { name: /Adicionar/i });

    expect(button).toBeInTheDocument();
  });
});
