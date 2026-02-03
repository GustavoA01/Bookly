import { render, screen } from "@testing-library/react";
import { BookSinopse } from "../components/BookSinopse";

describe("BookSinopse", () => {
  it("should render sinopse and comment when both are provided", () => {
    render(
      <BookSinopse
        sinopse="This is a great book."
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

  it("should render only sinopse when comment is not provided", () => {
    render(<BookSinopse sinopse="This is a great book." comment={null} />);

    expect(screen.getByText("Sinopse")).toBeInTheDocument();
    expect(screen.queryByText("Comentário")).not.toBeInTheDocument();
    expect(screen.getByText("This is a great book.")).toBeInTheDocument();
  });

  it("should render only comment when sinopse is not provided", () => {
    render(
      <BookSinopse sinopse={null} comment="Great characters development." />,
    );

    expect(screen.queryByText("Sinopse")).not.toBeInTheDocument();
    expect(screen.getByText("Comentário")).toBeInTheDocument();
    expect(
      screen.getByText("Great characters development."),
    ).toBeInTheDocument();
  });

  it("should render nothing when both sinopse and comment are null", () => {
    const { container } = render(<BookSinopse sinopse={null} comment={null} />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
