import { render, screen } from "@testing-library/react";
import { BookForm } from "../container/BookForm";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
  useQuery: jest
    .fn()
    .mockReturnValue({ title: "Test Book", author: "Test Author" }),
  useMutation: jest.fn().mockReturnValue({ mutateAsync: jest.fn() }),
}));

describe("BookForm", () => {
  it("renders the form correctly", () => {
    render(<BookForm id="123" role="library" />);

    expect(screen.getByText("Título*")).toBeInTheDocument();
    expect(screen.getByText("Sinopse")).toBeInTheDocument();
    expect(screen.getByText("Comentário")).toBeInTheDocument();
  });
});
