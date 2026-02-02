import { render, screen } from "@testing-library/react";
import { ListCard } from "../components/ListCard";

describe("ListCard", () => {
  it("renders component correctly", () => {
    render(<ListCard name="Favoritos" itemCount={2} />);

    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByText("2 livros")).toBeInTheDocument();
  });
});
