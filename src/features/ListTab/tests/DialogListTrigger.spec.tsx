import { Dialog } from "@/src/components/ui/dialog";
import { fireEvent, render, screen } from "@testing-library/react";
import { DialogListTrigger } from "../components/DialogListTrigger";

describe("DialogListTrigger", () => {
  const mockFn = jest.fn();
  render(
    <Dialog>
      <DialogListTrigger onClick={mockFn} />
    </Dialog>,
  );

  it("should render the trigger button", () => {
    const component = screen.getByText("Criar Nova Lista");
    fireEvent.click(component);
    expect(component).toBeInTheDocument();
    expect(mockFn).toHaveBeenCalled();
  });
});
