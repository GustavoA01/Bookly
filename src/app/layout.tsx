import type { Metadata } from "next"
import { Geist, Geist_Mono, Montserrat } from "next/font/google"
import "./globals.css"
import { Header } from "../components/Header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bookly",
  description: "Encontre e salve livros na sua biblioteca usando IA.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-lt-installed="true">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} dark antialiased`}
      >
        <main className="flex gap-8 flex-col min-h-screen container mx-auto py-8 max-sm:px-4">
          <Header />

          {children}
        </main>
      </body>
    </html>
  )
}
