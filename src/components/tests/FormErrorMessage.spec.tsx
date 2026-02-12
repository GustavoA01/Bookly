import { render, screen } from "@testing-library/react";
import { FormErrorMessage } from "../FormErrorMessage";

describe("FormErrorMessage", () => {
  it("renders the error message when error is present", () => {
    const errorMessage = "This field is required";
    render(
      <FormErrorMessage
        className="underline"
        showMessage
        message={errorMessage}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass(
      "text-sm text-red-600 underline",
    );
  });

  it("does not render the error message when showMessage is false", () => {
    const errorMessage = "This field is required";
    render(
      <FormErrorMessage
        className="underline"
        showMessage={false}
        message={errorMessage}
      />,
    );

    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });
});
