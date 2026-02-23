import { act, renderHook } from "@testing-library/react";
import { useImageBook } from "../useImageBook";

describe("useImageBook", () => {
  test("cleanCurrentImage", () => {
    const mockSetValue = jest.fn();
    const { result } = renderHook(() => useImageBook(mockSetValue));
    result.current.cleanCurrentImage();

    expect(mockSetValue).toHaveBeenCalledWith("imageUrl", "");
    expect(mockSetValue).toHaveBeenCalledWith("imageFile", undefined);
    expect(result.current.choosedFile).toBeUndefined();
  });

  test("handleImageError", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useImageBook(jest.fn()));
    result.current.handleImageError();

    act(() => {
      result.current.handleImageError();
    });

    expect(result.current.chooseImageError).toBe("Erro ao carregar a imagem");
    expect(result.current.choosedFile).toBeUndefined();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.chooseImageError).toBeNull();
    jest.useRealTimers();
  });

  test("handleFileChange", () => {
    const mockSetValue = jest.fn();
    window.URL.createObjectURL = jest
      .fn()
      .mockReturnValue(() => "blob:http://localhost/example");
    const { result } = renderHook(() => useImageBook(mockSetValue));
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const event = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    result.current.handleFileChange(event);

    expect(mockSetValue).toHaveBeenCalledWith("imageUrl", "");
    expect(mockSetValue).toHaveBeenCalledWith("imageFile", file);
  });
});
