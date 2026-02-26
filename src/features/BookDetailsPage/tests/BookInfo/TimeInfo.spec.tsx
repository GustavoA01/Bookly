import { render, screen } from "@testing-library/react";
import { TimeInfo } from "../../components/BookInfo/TimeInfo";
import { Timestamp } from "firebase/firestore";

jest.mock("next/navigation", () => ({
  usePathname: () => "/livro/",
}));

describe("TimeInfo", () => {
  it("renders correctly with given props", () => {
    render(
      <TimeInfo
        startDate={Timestamp.fromDate(new Date("2024-01-01"))}
        endDate={Timestamp.fromDate(new Date("2024-12-31"))}
        progress={75}
      />,
    );

    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("31/12/2023")).toBeInTheDocument();
    expect(screen.getByText("Término")).toBeInTheDocument();
    expect(screen.getByText("31/12/2023")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("renders placeholders when dates are null", () => {
    render(<TimeInfo startDate={null} endDate={null} progress={50} />);

    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getAllByText("--/--/----")[0]).toBeInTheDocument();
    expect(screen.getByText("Término")).toBeInTheDocument();
    expect(screen.getAllByText("--/--/----")[1]).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});
