import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ChakraProvider } from '@/providers/ChakraProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEO Soccer Note - MVP Mock',
  description: 'Soccer player data management and AI coaching platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
