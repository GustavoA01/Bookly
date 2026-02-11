import { render, screen } from "@testing-library/react";
import { ImageForm } from "../components/ImageForm";

jest.mock("react-hook-form", () => ({
  useFormContext: () => ({
    register: jest.fn(),
  }),
}));

jest.mock("next/image", () => {
  const MockImage = ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

describe("ImageForm", () => {
  it("renders component correctly", () => {
    render(
      <ImageForm
        register={jest.fn()}
        status="reading"
        setStatus={jest.fn()}
        handleFileChange={jest.fn()}
        choosedFile={undefined}
        setChoosedFile={jest.fn()}
        showImage={false}
        handleImageError={jest.fn()}
        cleanCurrentImage={jest.fn()}
      />,
    );

    expect(screen.getByText("Nota")).toBeInTheDocument();
    expect(screen.getAllByText("Status")[0]).toBeInTheDocument();
    expect(screen.getByText("Escolher imagem do livro")).toBeInTheDocument();
  });

  it("renders error message when chooseImageError is present", () => {
    const errorMessage = "Error choosing image";

    render(
      <ImageForm
        register={jest.fn()}
        status="reading"
        setStatus={jest.fn()}
        handleFileChange={jest.fn()}
        choosedFile={"https://example.com/image.jpg"}
        setChoosedFile={jest.fn()}
        showImage={false}
        chooseImageError={errorMessage}
        handleImageError={jest.fn()}
        cleanCurrentImage={jest.fn()}
      />,
    );
  });
});
