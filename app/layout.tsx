import './globals.css'
import { Navbar,Footer } from '@/components'
export const metadata = {
  title: 'Dinga Car Rentals',
  description: 'Find , Book or Rent a Car - Quickly and Easily! with Dinga Car Rentals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
