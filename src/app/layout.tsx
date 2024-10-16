import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your Name - Portfolio',
  description: 'Showcase of my work and skills as a developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen flex flex-col`}>
        <header className="py-6 border-b border-gray-200">
          <nav className="container mx-auto flex justify-between items-center px-4">
            <Link href="/" className="text-2xl font-bold text-emerald-700">YourName</Link>
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-emerald-700 transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-700 transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="py-6 text-center text-gray-500 border-t border-gray-200">
          <p>&copy; 2023 YourName. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}