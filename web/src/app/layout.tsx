import './globals.css'
import { ReactNode } from 'react'
import { Roboto_Flex as Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'HelpDesk',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body
        className={`${roboto.variable} bg-zinc-950 font-sans leading-relaxed text-zinc-50 antialiased selection:bg-emerald-300 selection:text-black`}
      >
        {children}
      </body>
    </html>
  )
}
