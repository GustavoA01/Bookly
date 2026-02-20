import { render, screen } from "@testing-library/react";
import { BookActions } from "../container/BookActions";

const mockGoback = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockGoback,
  }),
  useParams: () => {
    return {
      id: "1",
    };
  },
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: () => ({
    mutateAsync: jest.fn(),
  }),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

jest.mock("firebase/auth", () => ({
  getAuth: () => ({
    currentUser: {
      uid: "123",
    },
  }),
}));

describe("BookActions", () => {
  it("should call go back function when back button is clicked", () => {
    render(<BookActions />);

    const backButton = screen.getByTestId("back-button");
    backButton.click();

    expect(mockGoback).toHaveBeenCalled();
  });
});
