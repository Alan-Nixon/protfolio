'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce solution' },
    { id: 2, title: 'Task Management App', description: 'A productivity app built with Next.js' },
  ])

  const [newProject, setNewProject] = useState({ title: '', description: '' })

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    setProjects([...projects, { id: Date.now(), ...newProject }])
    setNewProject({ title: '', description: '' })
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
        <form onSubmit={handleAddProject} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
            <textarea
              id="description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>
          <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">
            <Plus className="inline-block mr-2" size={18} />
            Add Project
          </button>
        </form>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
                  <td className="px-6 py-4">{project.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/projects/${project.id}`} className="text-emerald-600 hover:text-emerald-900 mr-3">
                      <Edit className="inline-block" size={18} />
                    </Link>
                    <button onClick={() => handleDeleteProject(project.id)} className="text-red-600 hover:text-red-900">
                      <Trash className="inline-block" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/admin/profile" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
          Edit Profile
        </Link>
      </div>
    </div>
  )
}