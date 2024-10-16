'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Code, Database, Server, MessageCircle, Mic, X, Send } from 'lucide-react'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState('')

  const toggleChat = () => setIsChatOpen(!isChatOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      // Here you would typically send the message to your chatbot API
      // and then add the response to the messages
      setInput('')
    }
  }

  return (
    <div className="container mx-auto px-4 relative"> 
      <section className="py-20 text-center">
        <div className="mb-8">
          <Image
            src="/placeholder.svg?height=200&width=200&text=Your+Profile"
            alt="Your Name"
            width={200}
            height={200}
            className="rounded-full mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4">Hi, I'm <span className="text-emerald-700">Your Name</span></h1>
        <p className="text-xl mb-8 text-gray-600">A passionate full-stack developer crafting digital experiences</p>
        <Link href="/contact" className="bg-emerald-700 text-white px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors inline-flex items-center">
          Get in touch <ArrowRight className="ml-2" />
        </Link>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Main Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((project) => (
            <div key={project} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <img src={`/placeholder.svg?height=200&width=400`} alt={`Project ${project}`} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Project Title {project}</h3>
                <p className="text-gray-600 mb-4">Brief description of the project and the technologies used.</p>
                <Link href={`/projects/${project}`} className="text-emerald-700 hover:underline">View Project</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Mini Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((project) => (
            <div key={project} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">Mini Project {project}</h3>
              <p className="text-gray-600 mb-4">A quick overview of this mini project.</p>
              <Link href={`/projects/${project + 2}`} className="text-emerald-700 hover:underline">Learn More</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <Code size={48} className="mx-auto mb-4 text-emerald-700" />
            <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
            <p className="text-gray-600">HTML, CSS, JavaScript, React, Next.js</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <Server size={48} className="mx-auto mb-4 text-emerald-700" />
            <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
            <p className="text-gray-600">Node.js, Express, Python, Django</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <Database size={48} className="mx-auto mb-4 text-emerald-700" />
            <h3 className="text-xl font-semibold mb-2">Database Management</h3>
            <p className="text-gray-600">MySQL, PostgreSQL, MongoDB</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Senior Full Stack Developer</h3>
            <p className="text-gray-600">Company Name, 2020 - Present</p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>Led development of scalable web applications</li>
              <li>Implemented CI/CD pipelines for efficient deployment</li>
              <li>Mentored junior developers and conducted code reviews</li>
            </ul>
          </div>
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Full Stack Developer</h3>
            <p className="text-gray-600">Previous Company, 2018 - 2020</p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>Developed and maintained multiple client projects</li>
              <li>Collaborated with design team to implement responsive UIs</li>
              <li>Optimized database queries for improved performance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Open Source Contributions</h2>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">npm Package: react-awesome-component</h3>
            <p className="text-gray-600 mb-4">A highly customizable React component for creating awesome UIs</p>
            <Link href="https://www.npmjs.com/package/react-awesome-component" className="text-emerald-700 hover:underline">View on npm</Link>
          </div>
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">npm Package: node-data-validator</h3>
            <p className="text-gray-600 mb-4">A robust data validation library for Node.js applications</p>
            <Link href="https://www.npmjs.com/package/node-data-validator" className="text-emerald-700 hover:underline">View on npm</Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Bachelor of Science in Computer Science</h3>
            <p className="text-gray-600">University Name, Graduation Year</p>
          </div>
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Full-Stack Web Development Bootcamp</h3>
            <p className="text-gray-600">Bootcamp Name, Completion Year</p>
          </div>
        </div>
      </section>

      {/* Chatbot Icon */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-emerald-700 text-white p-3 rounded-full shadow-lg hover:bg-emerald-800 transition-colors"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center bg-emerald-700 text-white p-4">
            <h3 className="font-semibold">Chat with Jarvis</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3/4 p-2 rounded-lg ${message.isUser ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center p-4 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-700 text-white px-4 py-2 rounded-r-md hover:bg-emerald-800 transition-colors"
            >
              <Send size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={`ml-2 p-2 rounded-full ${isVoiceEnabled ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Mic size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}