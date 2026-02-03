import { render, screen } from "@testing-library/react";
import { BookActions } from "../components/BookActions";

const mockGoback = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockGoback,
  }),
}));

describe("BookActions", () => {
  it("should call go back function when back button is clicked", () => {
    render(<BookActions />);

    const backButton = screen.getAllByRole("button")[0];
    backButton.click();

    expect(mockGoback).toHaveBeenCalled();
  });
});
