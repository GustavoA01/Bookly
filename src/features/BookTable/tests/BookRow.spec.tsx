import { render, screen } from "@testing-library/react";
import { BookRow } from "../components/BookRow";
import { Timestamp } from "firebase/firestore";

const pushMockFn = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMockFn,
  }),
}));

describe("BookRow Component", () => {
  beforeEach(() => {
    render(
      <BookRow
        id="testId"
        title="O Senhor dos Anéis"
        author="J.R.R. Tolkien"
        createdAt={Timestamp.fromDate(new Date("2023-01-21"))}
        genre="Fantasia"
        status="read"
        rating={5}
      />,
    );
  });

  it("renders component with correct props", () => {
    expect(screen.getByText("O Senhor dos Anéis")).toBeInTheDocument();
    expect(screen.getByText("J.R.R. Tolkien")).toBeInTheDocument();
    expect(screen.getByText("20/01/2023")).toBeInTheDocument();
    expect(screen.getByText("Fantasia")).toBeInTheDocument();
    expect(screen.getByText("Lido")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls router.push on row click", () => {
    const row = screen.getByTestId("book-row");
    row.click();

    expect(pushMockFn).toHaveBeenCalledWith("/livro/testId");
  });
});
