import { Work_Sans, Silkscreen, Red_Hat_Mono } from '@next/font/google'
import '@drip3/assets/css/main.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-worksans',
})

const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-silkscreen',
})

const mono = Red_Hat_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${silkscreen.variable} ${mono.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
