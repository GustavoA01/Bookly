import { render, screen } from "@testing-library/react";
import { TimeInfo } from "../components/BookInfo/TimeInfo";

jest.mock("next/navigation", () => ({
  usePathname: () => "/livro/",
}));

describe("TimeInfo", () => {
  it("renders correctly with given props", () => {
    render(
      <TimeInfo startDate="01/01/2024" endDate="31/12/2024" progress={75} />,
    );

    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("01/01/2024")).toBeInTheDocument();
    expect(screen.getByText("Término")).toBeInTheDocument();
    expect(screen.getByText("31/12/2024")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });
});
