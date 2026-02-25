import { render, screen } from "@testing-library/react";
import { ListInfo } from "../components/BookInfo/ListInfo";
import { ListType } from "@/src/data/types/books";
import { Timestamp } from "firebase/firestore";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn().mockReturnValueOnce("/livro/"),
}));

jest.mock("firebase/firestore", () => ({
  Timestamp: {
    fromDate: jest.fn(),
  },
}));

const mockLists: ListType[] = [
  {
    id: "1",
    name: "Favoritos",
    description: "Melhores livros de fantasia",
    imageUrl: "https://example.com/image.jpg",
    books: [],
    userId: "123",
    createdAt: Timestamp.fromDate(new Date("2024-01-01T00:00:00Z")),
  },
  {
    id: "2",
    name: "Quero Ler",
    description: "Livros que quero ler",
    imageUrl: "https://example.com/image.jpg",
    books: [],
    userId: "123",
    createdAt: Timestamp.fromDate(new Date("2024-01-01T00:00:00Z")),
  },
];

describe("ListInfo", () => {
  it("should render list names when lists are provided", () => {
    render(<ListInfo lists={mockLists} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("Favoritos");
    expect(buttons[1]).toHaveTextContent("Quero Ler");
  });
});
