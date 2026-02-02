import { render, screen } from "@testing-library/react";
import { ImageForm } from "../components/ImageForm";

describe("ImageForm", () => {
  it("renders component correctly", () => {
    render(<ImageForm />);

    expect(screen.getByText("Nota")).toBeInTheDocument();
    expect(screen.getAllByText("Status")[0]).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Capa do livro");
  });
});
