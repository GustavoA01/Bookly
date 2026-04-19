import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bookly-gustavo.vercel.app/'),
  title: 'Bookly',
  description: 'Encontre e salve livros na sua biblioteca usando IA.',
  abstract:
    'Bookly é um aplicativo de biblioteca pessoal que utiliza inteligência artificial para ajudar os usuários a encontrar e salvar livros.',
  authors: [{ name: 'Gustavo Aguiar' }],
  creator: 'Gustavo Aguiar',
  publisher: 'Bookly',
  keywords: [
    'bookly',
    'biblioteca pessoal',
    'inteligência artificial',
    'encontrar livros',
    'livros',
    'gestão de leitura',
  ],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Bookly',
    description: 'Salve e encontre livros usando IA',
    siteName: 'Bookly',
    locale: 'pt_BR',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Preview do site Bookly',
      },
    ],
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="pt-br" data-lt-installed="true" suppressHydrationWarning>
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} dark antialiased`}
    >
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
