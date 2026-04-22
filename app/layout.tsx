import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Editorial Atelier | Salón de Belleza de Alta Gama',
  description: 'Una experiencia curada donde la precisión arquitectónica se encuentra con el arte fluido del estilo editorial.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&family=Manrope:wght@300;400;500;600;800&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-background text-on-background font-body selection:bg-secondary-fixed selection:text-on-secondary-fixed overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
