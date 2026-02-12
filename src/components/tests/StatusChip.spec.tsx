import { render, screen } from "@testing-library/react";
import { StatusChip } from "../StatusChip";
import { Status } from "@/src/data/types/books";

describe("StatusChip", () => {
  it("renders the correct label and icon for each status", () => {
    const status: Status[] = ["reading", "read", "toRead", "abandoned"];
    const labels = ["Lendo", "Lido", "Quero ler", "Abandonado"];

    labels.forEach((label, idx) => {
      render(<StatusChip status={status[idx]} />);
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("applies the correct color classes for all statuses", () => {
    const cases = [
      {
        status: "reading",
        label: "Lendo",
        bg: "bg-primary/15",
        text: "text-primary",
      },
      {
        status: "read",
        label: "Lido",
        bg: "bg-green-500/15",
        text: "text-green-500",
      },
      {
        status: "toRead",
        label: "Quero ler",
        bg: "bg-yellow-500/15",
        text: "text-yellow-500",
      },
      {
        status: "abandoned",
        label: "Abandonado",
        bg: "bg-red-400/15",
        text: "text-red-400",
      },
    ];

    cases.forEach(({ status, label, bg, text }) => {
      render(<StatusChip status={status as Status} />);
      const chip = screen.getByText(label).parentElement;

      expect(chip).toHaveClass(bg);
      expect(chip).toHaveClass(text);
    });
  });
});
