import { render, screen } from "@testing-library/react";
import { MobileAddButton } from "../MobileAddButton";

describe("MobileAddButton", () => {
  it("should render with correct props", () => {
    render(<MobileAddButton tab="books" />);
    expect(screen.getByRole("button")).toHaveClass(
      "sm:hidden fixed z-10 right-5 bottom-20 rounded-full",
    );
    expect(screen.getByTestId("plus-icon")).toHaveClass("lucide lucide-plus");
  });

  it("should link to /novo-livro when tab is 'books'", () => {
    render(<MobileAddButton tab="books" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/novo-livro");
  });

  it("should link to /novo-livro when tab is undefined", () => {
    render(<MobileAddButton tab={undefined} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/novo-livro");
  });

  it("should link to /nova-lista when tab is 'lists'", () => {
    render(<MobileAddButton tab="lists" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/nova-lista");
  });
});
