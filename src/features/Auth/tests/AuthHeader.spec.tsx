import { render, screen } from "@testing-library/react";
import { AuthHeader } from "../components/AuthHeader";

describe("AuthHeader", () => {
  it("should render the AuthHeader component", () => {
    render(
      <AuthHeader
        title="Login"
        description="Faça login pra acessar sua conta"
      />,
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(
      screen.getByText("Faça login pra acessar sua conta"),
    ).toBeInTheDocument();
  });
});
