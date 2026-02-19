import { render, screen } from "@testing-library/react";
import { AuthorForm } from "../components/AuthorForm";

jest.mock("react-hook-form", () => ({
  useFormContext: () => ({
    register: jest.fn(),
  }),
}));

describe("AuthorForm", () => {
  it("renders component correctly", () => {
    render(<AuthorForm register={jest.fn()} />);

    expect(screen.getByText("Autor")).toBeInTheDocument();
    expect(screen.getByText("Gênero")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ex: J.R.R. Tolkien"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ex: Fantasia")).toBeInTheDocument();
  });
});
