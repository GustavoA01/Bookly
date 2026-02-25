import { fireEvent, render, screen } from "@testing-library/react";
import { ListCard } from "../components/ListCard";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ListCard", () => {
  it("renders component correctly", () => {
    render(<ListCard name="Favoritos" itemCount={2} id="123" />);

    const component = screen.getByText("Favoritos");
    fireEvent.click(component);

    expect(mockPush).toHaveBeenCalledWith("/lista/123");
    expect(component).toBeInTheDocument();
    expect(screen.getByText("2 livros")).toBeInTheDocument();
  });
});
