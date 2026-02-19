import { fireEvent, render, screen } from "@testing-library/react";
import { LogOutButton } from "../LogOutButton";
import { auth } from "@/src/services/firebase/firebaseConfig";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    signOut: jest.fn(),
  })),
}));

describe("LogOutButton", () => {
  beforeEach(() => {
    render(<LogOutButton />);
  });

  it("should render the LogOutButton component", () => {
    const component = screen.getByRole("button");
    expect(component).toHaveTextContent("Sair");
  });

  it("should call signOut when the button is clicked", () => {
    const component = screen.getByRole("button");
    fireEvent.click(component);
    expect(auth.signOut as jest.Mock).toHaveBeenCalled();
  });
});
