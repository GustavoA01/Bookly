import { render, screen } from '@testing-library/react';
import { ListInfo } from '../components/ListInfo';

jest.mock('next/image', () => {
  const mockImage = ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;

    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} width={200} height={200} />;

  mockImage.displayName = 'MockImage';
  return mockImage;
});

describe('ListInfo', () => {
  it('should render list props correctly', () => {
    const mockList = {
      name: 'Minha Lista de Leitura',
      imageUrl: 'https://example.com/image.jpg',
      description: 'Uma lista com meus livros favoritos.',
      date: '10/04/2026',
    };

    render(<ListInfo {...mockList} />);
    const image = screen.getByRole('img');

    expect(screen.getByText(mockList.name)).toBeInTheDocument();
    expect(screen.getByText(mockList.description)).toBeInTheDocument();
    expect(screen.getByText(mockList.date)).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockList.imageUrl);
    expect(image).toHaveAttribute('alt', `Imagem de ${mockList.name}`);
    expect(image).toHaveAttribute('width', '200');
    expect(image).toHaveAttribute('height', '200');
  });

  it('should render without image and description', () => {
    const mockList = {
      name: 'Lista Sem Imagem',
      imageUrl: null,
      description: null,
      date: '15/05/2026',
    };

    render(<ListInfo {...mockList} />);

    expect(screen.getByText(mockList.name)).toBeInTheDocument();
    expect(screen.getByText(mockList.date)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('h2')).not.toBeInTheDocument();
  });
});
