'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Instagram, FileCode, GitBranch } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
          <div className="mb-8">
            <img src="/placeholder.svg?height=300&width=300&text=Your+Profile+Image" alt="Your Name" className="rounded-full w-48 h-48 object-cover mx-auto md:mx-0" />
          </div>
          <div className="flex flex-wrap gap-4 mb-8">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-800">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-800">
              <Linkedin size={24} />
            </a>
            <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-800">
              <Instagram size={24} />
            </a>
            <a href="https://stackoverflow.com/users/youruserid" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-800">
              <FileCode size={24} />
            </a>
            <a href="https://gitlab.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-800">
              <GitBranch size={24} />
            </a>
          </div>
          <p className="text-gray-600 mb-4">Feel free to reach out to me through any of these platforms or use the contact form.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="bg-emerald-50 p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-emerald-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-emerald-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-emerald-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}