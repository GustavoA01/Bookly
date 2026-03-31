import { renderHook, act } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import { useListMutation } from "./useListMutation";
import { useNewList } from "./useNewList";
import { useAuth } from "@/src/data/contexts/AuthProvider";
import { useImageForm } from "@/src/hooks/useImageForm";
import { ListFormType } from "@/src/data/schemas";
import { ListType } from "@/src/data/types/books";

jest.mock("../../../data/contexts/AuthProvider");
jest.mock("./useListMutation");
jest.mock("../../../hooks/useImageForm");
jest.mock("firebase/firestore", () => ({
  Timestamp: {
    now: jest.fn(),
  },
  getFirestore: jest.fn(),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

global.URL.revokeObjectURL = jest.fn();

const mockData: ListFormType = {
  name: "Minha Lista",
  description: "Descrição da minha lista",
  imageUrl: "https://example.com/image.jpg",
};

const updateMockData: ListFormType = {
  name: "Lista Atualizada",
  description: "Descrição atualizada",
  imageUrl: "https://example.com/nova-imagem.jpg",
};

describe("useNewList", () => {
  describe("handleCreateList", () => {
    const mockUser = { uid: "user-123" };
    const mockCreateListFn = jest.fn();
    const mockUpdateListFn = jest.fn();
    const mockSetChoosedFile = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      (Timestamp.now as jest.Mock).mockReturnValue({
        seconds: 1234567890,
        nanoseconds: 0,
      });
      (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
      (useListMutation as jest.Mock).mockReturnValue({
        createListFn: mockCreateListFn,
        updateListFn: mockUpdateListFn,
      });
      (useImageForm as jest.Mock).mockReturnValue({
        choosedFile: null,
        setChoosedFile: mockSetChoosedFile,
        chooseImageError: null,
        showImage: null,
        cleanCurrentImage: jest.fn(),
        handleImageError: jest.fn(),
        handleFileChange: jest.fn(),
      });
    });

    it("should return undefined if user is not authenticated", async () => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });

      const { result } = renderHook(() => useNewList());

      let returnValue;
      await act(async () => {
        returnValue = await result.current.submitForm(mockData);
      });

      expect(returnValue).toBeUndefined();
      expect(mockCreateListFn).not.toHaveBeenCalled();
    });

    it("should call createListFn when user is authenticated", async () => {
      const { result } = renderHook(() => useNewList());

      await act(async () => {
        await result.current.submitForm(mockData);
      });

      expect(mockCreateListFn).toHaveBeenCalledTimes(1);
      expect(mockCreateListFn).toHaveBeenCalledWith({
        name: "Minha Lista",
        description: "Descrição da minha lista",
        imageUrl: "https://example.com/image.jpg",
        createdAt: { seconds: 1234567890, nanoseconds: 0 },
        books: [],
        userId: "user-123",
      });
    });

    // it("should set choosedFile when imageUrl is provided", async () => {
    //   const { result } = renderHook(() => useNewList());

    //   await act(async () => {
    //     await result.current.submitForm(mockData);
    //   });

    //   expect(mockSetChoosedFile).toHaveBeenCalledWith(
    //     "https://example.com/image.jpg",
    //   );
    // });

    it("should handle description as null when not provided", async () => {
      const { result } = renderHook(() => useNewList());

      const dataWithoutDescription = {
        name: "Minha Lista",
        description: undefined,
        imageUrl: "https://example.com/image.jpg",
      };

      await act(async () => {
        await result.current.submitForm(dataWithoutDescription);
      });

      expect(mockCreateListFn).toHaveBeenCalledWith(
        expect.objectContaining({
          description: null,
        }),
      );
    });

    it("should handle imageUrl as null when not provided", async () => {
      const { result } = renderHook(() => useNewList());

      const dataWithoutImage = {
        name: "Minha Lista",
        description: "Descrição",
        imageUrl: undefined,
      };

      await act(async () => {
        await result.current.submitForm(dataWithoutImage);
      });

      expect(mockCreateListFn).toHaveBeenCalledWith(
        expect.objectContaining({
          imageUrl: null,
        }),
      );
    });
  });

  describe("handleUpdateList", () => {
    const mockUser = { uid: "user-123" };
    const mockCreateListFn = jest.fn();
    const mockUpdateListFn = jest.fn();
    const mockSetChoosedFile = jest.fn();

    const mockExistingList: ListType = {
      id: "list-123",
      name: "Lista Antiga",
      description: "Descrição antiga",
      imageUrl: "https://example.com/imagem-antiga.jpg",
      createdAt: { seconds: 1234567890, nanoseconds: 0 } as Timestamp,
      books: [],
      userId: "user-123",
    };

    beforeEach(() => {
      jest.clearAllMocks();
      (Timestamp.now as jest.Mock).mockReturnValue({
        seconds: 1234567890,
        nanoseconds: 0,
      });
      (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
      (useListMutation as jest.Mock).mockReturnValue({
        createListFn: mockCreateListFn,
        updateListFn: mockUpdateListFn,
      });
      (useImageForm as jest.Mock).mockReturnValue({
        choosedFile: null,
        setChoosedFile: mockSetChoosedFile,
        chooseImageError: null,
        showImage: null,
        cleanCurrentImage: jest.fn(),
        handleImageError: jest.fn(),
        handleFileChange: jest.fn(),
      });
    });

    it("should return undefined if user is not authenticated", async () => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });

      const { result } = renderHook(() => useNewList(mockExistingList));

      let returnValue;
      await act(async () => {
        returnValue = await result.current.submitForm(mockData);
      });

      expect(returnValue).toBeUndefined();
      expect(mockUpdateListFn).not.toHaveBeenCalled();
    });

    it("should return undefined if list is not provided", async () => {
      const { result } = renderHook(() => useNewList());
      let returnValue;
      await act(async () => {
        returnValue = await result.current.submitForm(mockData);
      });

      expect(returnValue).toBeUndefined();
      expect(mockUpdateListFn).not.toHaveBeenCalled();
      expect(mockCreateListFn).toHaveBeenCalled();
    });

    it("should call updateListFn when user and list are provided", async () => {
      const { result } = renderHook(() => useNewList(mockExistingList));

      await act(async () => {
        await result.current.submitForm(updateMockData);
      });

      expect(mockUpdateListFn).toHaveBeenCalledTimes(1);
      expect(mockUpdateListFn).toHaveBeenCalledWith({
        list: {
          name: "Lista Atualizada",
          description: "Descrição atualizada",
          imageUrl: "https://example.com/nova-imagem.jpg",
        },
        listId: "list-123",
        user: mockUser,
      });
    });

    it("should handle description as null when not provided", async () => {
      const { result } = renderHook(() => useNewList(mockExistingList));

      const dataWithoutDescription = {
        name: "Lista Atualizada",
        description: undefined,
        imageUrl: "https://example.com/nova-imagem.jpg",
      };

      await act(async () => {
        await result.current.submitForm(dataWithoutDescription);
      });

      expect(mockUpdateListFn).toHaveBeenCalledWith({
        list: {
          name: "Lista Atualizada",
          description: null,
          imageUrl: "https://example.com/nova-imagem.jpg",
        },
        listId: "list-123",
        user: mockUser,
      });
    });

    it("should handle imageUrl as null when not provided", async () => {
      const { result } = renderHook(() => useNewList(mockExistingList));

      const dataWithoutImage = {
        name: "Lista Atualizada",
        description: "Descrição atualizada",
        imageUrl: undefined,
      };

      await act(async () => {
        await result.current.submitForm(dataWithoutImage);
      });

      expect(mockUpdateListFn).toHaveBeenCalledWith({
        list: {
          name: "Lista Atualizada",
          description: "Descrição atualizada",
          imageUrl: null,
        },
        listId: "list-123",
        user: mockUser,
      });
    });

    it("should not call setChoosedFile when imageUrl is not provided", async () => {
      const { result } = renderHook(() => useNewList(mockExistingList));

      const dataWithoutImage = {
        name: "Lista Atualizada",
        description: "Descrição atualizada",
        imageUrl: undefined,
      };

      await act(async () => {
        await result.current.submitForm(dataWithoutImage);
      });

      expect(mockSetChoosedFile).not.toHaveBeenCalled();
    });

    it("should handle update with empty description", async () => {
      const { result } = renderHook(() => useNewList(mockExistingList));

      const dataWithEmptyDescription = {
        name: "Lista Atualizada",
        description: "",
        imageUrl: "https://example.com/nova-imagem.jpg",
      };

      await act(async () => {
        await result.current.submitForm(dataWithEmptyDescription);
      });

      expect(mockUpdateListFn).toHaveBeenCalledWith({
        list: {
          name: "Lista Atualizada",
          description: null,
          imageUrl: "https://example.com/nova-imagem.jpg",
        },
        listId: "list-123",
        user: mockUser,
      });
    });

    it("should handle update with empty imageUrl", async () => {
      const { result } = renderHook(() => useNewList(mockExistingList));

      const dataWithEmptyImage = {
        name: "Lista Atualizada",
        description: "Descrição atualizada",
        imageUrl: "",
      };

      await act(async () => {
        await result.current.submitForm(dataWithEmptyImage);
      });

      expect(mockUpdateListFn).toHaveBeenCalledWith({
        list: {
          name: "Lista Atualizada",
          description: "Descrição atualizada",
          imageUrl: null,
        },
        listId: "list-123",
        user: mockUser,
      });
    });
  });
});
