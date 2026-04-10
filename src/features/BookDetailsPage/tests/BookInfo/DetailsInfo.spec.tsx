import { render, screen } from '@testing-library/react';
import { DetailsInfo } from '../../components/BookInfo/DetailsInfo';

describe('DetailsInfo', () => {
  it('should render genre and pages correctly', () => {
    render(
      <DetailsInfo currentPage={480} totalPages={1000} genre="Fantasia" />
    );

    expect(screen.getByText('DETALHES')).toBeInTheDocument();
    expect(screen.getByText('GÊNERO')).toBeInTheDocument();
    expect(screen.getByText('Fantasia')).toBeInTheDocument();
    expect(screen.getByText('PÁGINAS')).toBeInTheDocument();
    expect(screen.getByText('480/1000')).toBeInTheDocument();
  });
});
