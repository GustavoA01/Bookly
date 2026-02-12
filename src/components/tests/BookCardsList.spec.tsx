import { render, screen } from "@testing-library/react";
import { BookCardsList } from "../BookCardsList";
import { GoogleBooksResponse } from "@/src/data/types/api";

const mockBooks: GoogleBooksResponse = {
  kind: "books#volumes",
  totalItems: 2,
  items: [
    {
      id: "1",
      volumeInfo: {
        title: "Book One",
        authors: ["Author A"],
        categories: ["Fiction"],
        averageRating: 4,
        imageLinks: {
          thumbnail: "/book1.jpg",
          smallThumbnail: "/book1-small.jpg",
        },
        language: "en",
        previewLink: "#",
      },
    },
    {
      id: "2",
      volumeInfo: {
        title: "Book Two",
        authors: ["Author B", "Author C"],
        categories: ["Adventure"],
        averageRating: 5,
        imageLinks: {
          thumbnail: "/book2.jpg",
          smallThumbnail: "/book2-small.jpg",
        },
        language: "en",
        previewLink: "#",
      },
    },
  ],
};

describe("BookCardsList", () => {
  it("renders a list of SearchBookCard components with correct data", () => {
    render(<BookCardsList books={mockBooks} />);

    expect(screen.getByText("Book One")).toBeInTheDocument();
    expect(screen.getByText("Book Two")).toBeInTheDocument();
    expect(screen.getByText("Author A")).toBeInTheDocument();
    expect(screen.getByText("Author B, Author C")).toBeInTheDocument();
    expect(screen.getByText("Fiction")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders nothing if items is undefined or empty", () => {
    const emptyBooks: GoogleBooksResponse = {
      kind: "books#volumes",
      totalItems: 0,
      items: [],
    };
    const { container } = render(<BookCardsList books={emptyBooks} />);

    expect(container).toBeEmptyDOMElement();
  });
});
