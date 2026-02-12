import { render, screen } from "@testing-library/react";
import { ImageForm } from "../components/ImageForm";

jest.mock("react-hook-form", () => ({
  useFormContext: () => ({
    register: jest.fn(),
  }),
}));

jest.mock("next/image", () => {
  const mockImage = ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;

    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} width={width} height={height} />;

  mockImage.displayName = "MockImage";
  return mockImage;
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
        chooseImageError={undefined}
      />,
    );

    expect(screen.getByText("Nota")).toBeInTheDocument();
    expect(screen.getAllByText("Status")[0]).toBeInTheDocument();
  });

  it("renders chosen image correctly", () => {
    const imageUrl = "https://example.com/image.jpg";

    render(
      <ImageForm
        register={jest.fn()}
        status="reading"
        setStatus={jest.fn()}
        handleFileChange={jest.fn()}
        choosedFile={imageUrl}
        setChoosedFile={jest.fn()}
        showImage={true}
        handleImageError={jest.fn()}
        cleanCurrentImage={jest.fn()}
        chooseImageError={undefined}
      />,
    );

    const imgElement = screen.getByRole("img") as HTMLImageElement;
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(imageUrl);
  });
});
