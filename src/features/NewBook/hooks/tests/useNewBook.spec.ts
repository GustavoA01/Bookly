/* eslint-disable @typescript-eslint/ban-ts-comment */
import { renderHook } from "@testing-library/react";
import { useNewBook } from "../useNewBook";
import { BookFormType } from "@/src/data/schemas";
import { useBookDates } from "../useBookDates";
import { useMutation } from "@tanstack/react-query";
import { BookType } from "@/src/data/types/books";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "@/src/data/contexts/AuthProvider";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock("../../../../data/contexts/AuthProvider");

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  Timestamp: {
    now: jest.fn().mockReturnValue("mocked-timestamp"),
  },
  getFirestore: jest.fn(),
}));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
  useQuery: jest
    .fn()
    .mockReturnValue({ title: "Test Book", author: "Test Author" }),
  useMutation: jest.fn().mockReturnValue({ mutateAsync: jest.fn() }),
}));

const mockFormData: BookFormType = {
  title: "Test Book",
  author: "Test Author",
  numberOfPages: 100,
  currentPage: 10,
  comment: "Test Comment",
  synopsis: "Test Synopsis",
  genre: "Test Genre",
  rating: 10,
};

const mockBookFormated: Omit<BookType, "id"> = {
  title: mockFormData.title,
  author: mockFormData.author || null,
  totalPages: mockFormData.numberOfPages || null,
  currentPage: mockFormData.currentPage ?? null,
  comment: mockFormData.comment || null,
  synopsis: mockFormData.synopsis || null,
  genre: mockFormData.genre || null,
  rating: mockFormData.rating ?? null,
  startDate: null,
  endDate: null,
  status: "toRead",
  imageUrl: null,
  createdAt: Timestamp.now(),
  userId: "test-user-id",
};

const mockBookToUpdate: Omit<BookType, "userId" | "id" | "createdAt"> = {
  title: mockFormData.title,
  author: mockFormData.author || null,
  totalPages: mockFormData.numberOfPages || null,
  currentPage: mockFormData.currentPage ?? null,
  comment: mockFormData.comment || null,
  synopsis: mockFormData.synopsis || null,
  genre: mockFormData.genre || null,
  rating: mockFormData.rating ?? null,
  startDate: null,
  endDate: null,
  status: "toRead",
  imageUrl: null,
};

describe("useNewBook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct initial values", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: "test-user-id" },
    });
    const { result } = renderHook(() =>
      useNewBook({ id: "123", role: "library" }),
    );

    expect(result.current.startDate).toBeUndefined();
    expect(result.current.endDate).toBeUndefined();
    expect(result.current.status).toBe("toRead");
    expect(result.current.choosedFile).toBeUndefined();
  });

  test("handleCreateBook with id and role undefined", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
    });
    const { result } = renderHook(() =>
      // @ts-ignore
      useNewBook({ id: undefined, role: undefined }),
    );

    const returnedUserNullValue =
      await result.current.handleCreateBook(mockFormData);

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
    expect(returnedUserNullValue).toBeUndefined();

    // @ts-ignore
    const { result: bookDatesResult } = renderHook(() => useBookDates());
    bookDatesResult.current.dateErrorMessage = "Test Date Error";

    const returnedDateErrorMessage =
      await result.current.handleCreateBook(mockFormData);

    expect(returnedDateErrorMessage).toBeUndefined();
  });

  test("handleCreateBook calls createBookFn", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: "test-user-id" },
    });
    const { result } = renderHook(() =>
      // @ts-ignore
      useNewBook({ id: undefined, role: undefined }),
    );
    const { result: bookDatesResult } = renderHook(() => useBookDates());
    bookDatesResult.current.dateErrorMessage = "";
    const { mutateAsync: mockCreateBookFn } = useMutation({});

    await result.current.handleCreateBook(mockFormData);

    expect(mockCreateBookFn).toHaveBeenCalledWith(mockBookFormated);
  });

  test("handleCreateBook with id and role defined", async () => {
    const { result } = renderHook(() =>
      useNewBook({ id: "123", role: "library" }),
    );
    const { mutateAsync: mockUpdateBookFn } = useMutation({});
    const returnedUndefinedValue =
      await result.current.handleCreateBook(mockFormData);

    expect(returnedUndefinedValue).toBeUndefined();
    expect(mockUpdateBookFn).toHaveBeenCalledWith(mockBookToUpdate);
  });
});
