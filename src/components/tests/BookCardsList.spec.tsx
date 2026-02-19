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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockBooks),
  }),
) as jest.Mock;

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/explorar"),
  useSearchParams: jest.fn(() => ({
    get: jest.fn((param) => {
      if (param === "page") return "1";
      return null;
    }),
  })),
}));

describe("BookCardsList", () => {
  it("renders a list of SearchBookCard components with correct data", async () => {
    const ResolvedComponent = await BookCardsList({ query: "test" });

    render(ResolvedComponent);

    expect(await screen.findByText("Book One")).toBeInTheDocument();
    expect(await screen.findByText("Book Two")).toBeInTheDocument();
    expect(await screen.findByText("Author A")).toBeInTheDocument();
    expect(await screen.findByText("Author B, Author C")).toBeInTheDocument();
    expect(await screen.findByText("Fiction")).toBeInTheDocument();
    expect(await screen.findByText("Adventure")).toBeInTheDocument();
    expect(await screen.findByText("4")).toBeInTheDocument();
    expect(await screen.findByText("5")).toBeInTheDocument();
  });
});
