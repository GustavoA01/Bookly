import { render, screen } from "@testing-library/react";
import { InfoSection } from "../../components/BookInfo/InfoSection";

describe("InfoSection", () => {
  it("renders component with correct props", () => {
    render(
      <InfoSection
        label="Test Label"
        value="Test Value"
        icon={<div>Test Icon</div>}
      />,
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
    expect(screen.getByText("Test Icon")).toBeInTheDocument();
  });
});
