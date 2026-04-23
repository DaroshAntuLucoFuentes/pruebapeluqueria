import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PeluRock Nata Leal | Peluquería y Spa Canino',
  description: 'Peluquería y Spa Canino con actitud rockera para tu peludito. De Peludogs Móvil nos transformamos en PeluRock.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&family=Manrope:wght@300;400;500;600;800&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-background text-on-background font-body selection:bg-secondary-fixed selection:text-on-secondary-fixed overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
