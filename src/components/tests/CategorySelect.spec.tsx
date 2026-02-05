import { fireEvent, render, screen } from "@testing-library/react";
import { CategorySelect } from "../CategorySelect";

describe("CategorySelect", () => {
  it("should render default categories when isHome is false", async () => {
    render(<CategorySelect value="" onValueChange={jest.fn()} />);

    const button = await screen.findByRole("combobox");
    fireEvent.click(button);

    expect(screen.getByText("Lido")).toBeInTheDocument();
    expect(screen.getByText("Lendo")).toBeInTheDocument();
    expect(screen.getByText("Abandonado")).toBeInTheDocument();
    expect(screen.getByText("Para ler")).toBeInTheDocument();
  });

  it("should render correct categories when isHome is true", async () => {
    render(<CategorySelect isHome value="" onValueChange={jest.fn()} />);

    const button = await screen.findByRole("combobox");
    fireEvent.click(button);

    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Lido")).toBeInTheDocument();
    expect(screen.getByText("Lendo")).toBeInTheDocument();
    expect(screen.getByText("Abandonado")).toBeInTheDocument();
    expect(screen.getByText("Para ler")).toBeInTheDocument();
  });
});
