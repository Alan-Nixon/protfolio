'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Book, Briefcase, Code, Database, User, LogOut, Menu, X, Contact } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/projects', label: 'Projects', icon: Briefcase },
    { href: '/admin/profile', label: 'Profile', icon: User },
    { href: '/admin/skills', label: 'Skills', icon: Code },
    { href: '/admin/Education', label: 'Education', icon: Book },
    { href: '/admin/integratedApi', label: 'Integrated APIs', icon: Database },
    { href: '/admin/contact', label: 'Contact', icon: Contact },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 z-10`}
      >
        <div className="flex items-center justify-between h-16 bg-emerald-600 px-4">
          <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
          <button onClick={toggleSidebar} className="text-white md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 ${
                pathname === item.href ? 'bg-emerald-50 text-emerald-600' : ''
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="flex items-center mb-2 w-full px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center px-4">
          <button onClick={toggleSidebar} className="text-gray-600 md:hidden">
            <Menu size={24} />
          </button>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}