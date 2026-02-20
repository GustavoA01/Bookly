import { render, screen } from "@testing-library/react";
import { BookSynopsis } from "../components/BookSynopsis";
describe("BookSynopsis", () => {
  it("should render synopsis and comment when both are provided", () => {
    render(
      <BookSynopsis
        synopsis="This is a great book."
        comment="Great characters development."
      />,
    );

    expect(screen.getByText("Sinopse")).toBeInTheDocument();
    expect(screen.getByText("Comentário")).toBeInTheDocument();
    expect(screen.getByText("This is a great book.")).toBeInTheDocument();
    expect(
      screen.getByText("Great characters development."),
    ).toBeInTheDocument();
  });

  it("should render only synopsis when comment is not provided", () => {
    render(<BookSynopsis synopsis="This is a great book." comment={null} />);

    expect(screen.getByText("Sinopse")).toBeInTheDocument();
    expect(screen.queryByText("Comentário")).not.toBeInTheDocument();
    expect(screen.getByText("This is a great book.")).toBeInTheDocument();
  });

  it("should render only comment when synopsis is not provided", () => {
    render(
      <BookSynopsis synopsis={null} comment="Great characters development." />,
    );

    expect(screen.queryByText("Sinopse")).not.toBeInTheDocument();
    expect(screen.getByText("Comentário")).toBeInTheDocument();
    expect(
      screen.getByText("Great characters development."),
    ).toBeInTheDocument();
  });

  it("should render nothing when both synopsis and comment are null", () => {
    const { container } = render(
      <BookSynopsis synopsis={null} comment={null} />,
    );

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
