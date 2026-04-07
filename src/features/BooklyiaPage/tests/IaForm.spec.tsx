import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IaForm } from "../components/IaForm";

jest.mock("lucide-react", () => ({
  Send: () => <div data-testid="send-icon">Send Icon</div>,
}));

jest.mock("../../../components/ui/spinner", () => ({
  Spinner: () => <div data-testid="spinner-icon">Spinner Icon</div>,
}));

jest.mock("../../../components/ui/textarea", () => ({
  Textarea: ({
    className,
    placeholder,
  }: {
    className: string;
    placeholder: string;
  }) => (
    <textarea
      data-testid="textarea"
      className={className}
      placeholder={placeholder}
    />
  ),
}));

jest.mock("../../../components/ui/button", () => ({
  Button: ({
    children,
    disabled,
    onClick,
    className,
    type,
  }: {
    children: React.ReactNode;
    disabled: boolean;
    onClick: () => void;
    className?: string;
    type?: "submit" | "reset" | "button" | undefined;
  }) => (
    <button
      data-testid="submit-button"
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  ),
}));
const mockHandleSubmit = jest.fn();
const mockHandleSearch = jest.fn();
const mockRegister = jest.fn();
const mockOnSubmit = jest.fn();

describe("IaForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockHandleSubmit.mockImplementation((callback) => {
      mockOnSubmit.mockImplementation(callback);
      return (e?: React.BaseSyntheticEvent) => {
        if (e) e.preventDefault();
        callback({ prompt: "test prompt" });
      };
    });

    mockRegister.mockReturnValue({
      name: "prompt",
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    });
  });

  const defaultProps = {
    handleSubmit: mockHandleSubmit,
    handleSearch: mockHandleSearch,
    register: mockRegister,
    isRequestPending: false,
  };

  it("should render the form correctly", () => {
    render(<IaForm {...defaultProps} />);

    expect(screen.getByTestId("textarea")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("send-icon")).toBeInTheDocument();
  });

  it("should have the correct placeholder in textarea", () => {
    render(<IaForm {...defaultProps} />);

    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveAttribute("placeholder", "Peça livros...");
  });

  it("should have the correct classes in textarea", () => {
    render(<IaForm {...defaultProps} />);

    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveClass(
      "resize-none",
      "max-w-2xl",
      "min-h-10",
      "max-h-20",
    );
  });

  it("should call handleSearch when form is submitted", async () => {
    render(<IaForm {...defaultProps} />);

    const textarea = screen.getByTestId("textarea");
    const form = screen.getByTestId("submit-button").closest("form");

    fireEvent.change(textarea, { target: { value: "livros de programação" } });

    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
      expect(mockHandleSearch).toHaveBeenCalled();
    });
  });

  it("should disable button when isRequestPending is true", () => {
    render(<IaForm {...defaultProps} isRequestPending={true} />);

    const button = screen.getByTestId("submit-button");
    expect(button).toBeDisabled();
  });

  it("should enable button when isRequestPending is false", () => {
    render(<IaForm {...defaultProps} isRequestPending={false} />);

    const button = screen.getByTestId("submit-button");
    expect(button).not.toBeDisabled();
  });

  it("should show Spinner when isRequestPending is true", () => {
    render(<IaForm {...defaultProps} isRequestPending={true} />);

    expect(screen.getByTestId("spinner-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("send-icon")).not.toBeInTheDocument();
  });

  it("should show Send icon when isRequestPending is false", () => {
    render(<IaForm {...defaultProps} isRequestPending={false} />);

    expect(screen.getByTestId("send-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("spinner-icon")).not.toBeInTheDocument();
  });

  it("should have correct layout classes in form", () => {
    render(<IaForm {...defaultProps} />);

    const form = screen.getByTestId("submit-button").closest("form");
    expect(form).toHaveClass(
      "flex",
      "justify-center",
      "gap-2",
      "m-auto",
      "mt-8",
      "w-full",
    );
  });

  it("should have mt-auto class on button", () => {
    render(<IaForm {...defaultProps} />);

    const button = screen.getByTestId("submit-button");
    expect(button).toHaveClass("mt-auto");
  });

  it("should register textarea with react-hook-form", () => {
    render(<IaForm {...defaultProps} />);

    expect(mockRegister).toHaveBeenCalledWith("prompt");
  });

  it("should call handleSearch with empty prompt when form is submitted without text", async () => {
    mockHandleSubmit.mockImplementation((callback) => {
      return (e?: React.BaseSyntheticEvent) => {
        if (e) e.preventDefault();
        callback({ prompt: "" });
      };
    });

    render(<IaForm {...defaultProps} />);

    const form = screen.getByTestId("submit-button").closest("form");
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith({ prompt: "" });
    });
  });
});
