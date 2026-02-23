import { act, renderHook } from "@testing-library/react";
import { useBookDates } from "../useBookDates";

describe("useBookDates", () => {
  test("handleCleanMessages", () => {
    const { result } = renderHook(() => useBookDates());
    const startDate = new Date(2023, 0, 2);
    const endDate = new Date(2023, 0, 1);

    act(() => {
      result.current.setStartDate(startDate);
      result.current.setEndDate(endDate);
      result.current.handleCleanDates();
    });

    expect(result.current.startDate).toBeUndefined();
    expect(result.current.endDate).toBeUndefined();
  });

  test("getErrorMessages - endDate before startDate", () => {
    const { result } = renderHook(() => useBookDates());
    const startDate = new Date(2023, 0, 2);
    const endDate = new Date(2023, 0, 1);

    act(() => {
      result.current.setStartDate(startDate);
      result.current.setEndDate(endDate);
    });

    expect(result.current.dateErrorMessage).toBe(
      "A data de término não pode ser anterior à data de início.",
    );
  });

  test("getErrorMessages - endDate defined but startDate not defined", () => {
    const { result } = renderHook(() => useBookDates());
    const endDate = new Date(2023, 0, 1);

    act(() => {
      result.current.setEndDate(endDate);
    });

    expect(result.current.dateErrorMessage).toBe(
      "A data de início é obrigatória para definir a data de término.",
    );
  });
});
