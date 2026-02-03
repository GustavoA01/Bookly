import { render, screen } from "@testing-library/react";
import { ImageForm } from "../components/ImageForm";

jest.mock("react-hook-form", () => ({
  useFormContext: () => ({
    register: jest.fn(),
  }),
}));

describe("ImageForm", () => {
  it("renders component correctly", () => {
    render(<ImageForm register={jest.fn()} />);

    expect(screen.getByText("Nota")).toBeInTheDocument();
    expect(screen.getAllByText("Status")[0]).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Capa do livro");
  });
});
