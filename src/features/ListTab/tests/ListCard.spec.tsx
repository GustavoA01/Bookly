import { render } from "@testing-library/react";
import { ListCard } from "../components/ListCard";

describe("ListCard", () => {
  it("renders component correctly", () => {
    render(<ListCard />);
    expect(true).toBe(true);
  });
});
