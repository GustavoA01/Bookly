import { render, screen } from '@testing-library/react';
import { PublisherInfo } from '../../components/BookInfo/PublisherInfo';

describe('PublisherInfo', () => {
  it('should render the PublisherInfo component with all props', () => {
    render(<PublisherInfo publisher="Editora XYZ" country="Brasil" language="Português" />);

    expect(screen.getByText('PUBLICAÇÃO')).toBeInTheDocument();
    expect(screen.getByText('EDITORA')).toBeInTheDocument();
    expect(screen.getByText('PAÍS')).toBeInTheDocument();
    expect(screen.getByText('IDIOMA')).toBeInTheDocument();
    expect(screen.getByText('Editora XYZ')).toBeInTheDocument();
    expect(screen.getByText('Brasil')).toBeInTheDocument();
    expect(screen.getByText('Português')).toBeInTheDocument();
  });

  it('returns null if all props are undefined', () => {
    const { container } = render(<PublisherInfo publisher={undefined} country={undefined} language={undefined} />);
    expect(container.firstChild).toBeNull();
  });
});
