'use client'

import { useState, useRef } from 'react'
import { Plus, Edit, Trash, X } from 'lucide-react'

interface Project {
  id: number
  title: string
  projectImage: string
  description: string
  link: string
  githubLink: string
  videoUrl: string
  images: string[]
  technologies: string[]
  type: 'main' | 'mini'
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'E-commerce Platform',
      projectImage: '/placeholder.svg?height=200&width=300',
      description: 'A full-stack e-commerce solution with React and Node.js',
      link: 'https://example.com/ecommerce',
      githubLink: 'https://github.com/yourusername/ecommerce',
      videoUrl: 'https://example.com/ecommerce-demo.mp4',
      images: ['/placeholder.svg?height=100&width=150', '/placeholder.svg?height=100&width=150'],
      technologies: ['React', 'Node.js', 'MongoDB'],
      type: 'main',
    },
    {
      id: 2,
      title: 'Weather App',
      projectImage: '/placeholder.svg?height=200&width=300',
      description: 'A simple weather application using a third-party API',
      link: 'https://example.com/weather-app',
      githubLink: 'https://github.com/yourusername/weather-app',
      videoUrl: '',
      images: ['/placeholder.svg?height=100&width=150'],
      technologies: ['JavaScript', 'HTML', 'CSS'],
      type: 'mini',
    },
  ])

  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    projectImage: '',
    description: '',
    link: '',
    githubLink: '',
    videoUrl: '',
    images: [],
    technologies: [],
    type: 'mini',
  })

  const [editingId, setEditingId] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    setProjects([...projects, { id: Date.now(), ...newProject }])
    setNewProject({
      title: '',
      projectImage: '',
      description: '',
      link: '',
      githubLink: '',
      videoUrl: '',
      images: [],
      technologies: [],
      type: 'mini',
    })
  }

  const handleEditProject = (id: number) => {
    const projectToEdit = projects.find((project) => project.id === id)
    if (projectToEdit) {
      setNewProject(projectToEdit)
      setEditingId(id)
    }
  }

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault()
    setProjects(
      projects.map((project) => (project.id === editingId ? { ...newProject, id: project.id } : project))
    )
    setNewProject({
      title: '',
      projectImage: '',
      description: '',
      link: '',
      githubLink: '',
      videoUrl: '',
      images: [],
      technologies: [],
      type: 'mini',
    })
    setEditingId(null)
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProject({ ...newProject, projectImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newImages.push(reader.result as string)
          if (newImages.length === files.length) {
            setNewProject({ ...newProject, images: [...newProject.images, ...newImages] })
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProject({ ...newProject, videoUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (index: number) => {
    setNewProject({
      ...newProject,
      images: newProject.images.filter((_, i) => i !== index),
    })
  }

  const handleAddTechnology = () => {
    setNewProject({ ...newProject, technologies: [...newProject.technologies, ''] })
  }

  const handleRemoveTechnology = (index: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== index),
    })
  }

  const handleTechnologyChange = (index: number, value: string) => {
    const updatedTechnologies = [...newProject.technologies]
    updatedTechnologies[index] = value
    setNewProject({ ...newProject, technologies: updatedTechnologies })
  }

  const renderProjects = (type: 'main' | 'mini') => (
    <div className="space-y-6">
      {projects.filter(project => project.type === type).map((project) => (
        <div key={project.id} className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <img src={project.projectImage} alt={project.title} className="w-full md:w-48 h-32 object-cover rounded mr-4 mb-4 md:mb-0" />
            <div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">{tech}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Live Demo</a>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>
          </div>
          {project.videoUrl && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Project Video</h4>
              <video src={project.videoUrl} controls className="w-full max-w-md mx-auto rounded" />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleEditProject(project.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>

      {/* List current projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Main Projects</h2>
        {renderProjects('main')}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mini Projects</h2>
        {renderProjects('mini')}
      </div>

      {/* Add/Edit project form */}
      <form onSubmit={editingId ? handleUpdateProject : handleAddProject} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="projectImage" className="block text-sm font-medium text-gray-700 mb-1">
              Project Image
            </label>
            <input
              type="file"
              id="projectImage"
              onChange={handleImageUpload}
              accept="image/*"
              ref={fileInputRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              Live Demo Link
            </label>
            <input
              type="url"
              id="link"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Link
            </label>
            <input
              type="url"
              id="githubLink"
              value={newProject.githubLink}
              onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Video
          </label>
          <input
            type="file"
            id="videoUrl"
            onChange={handleVideoUpload}
            accept="video/*"
            ref={videoInputRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Images
          </label>
          <input
            type="file"
            id="images"
            onChange={handleMultipleImageUpload}
            accept="image/*"
            multiple
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {newProject.images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Additional ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
          {newProject.technologies.map((tech, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechnologyChange(index, e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveTechnology(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTechnology}
            className="mt-2  px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            <Plus size={16} className="inline mr-1" /> Add Technology
          </button>
        </div>
        <div className="mt-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Project Type
          </label>
          <select
            id="type"
            value={newProject.type}
            onChange={(e) => setNewProject({ ...newProject, type: e.target.value as 'main' | 'mini' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="main">Main Project</option>
            <option value="mini">Mini Project</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {editingId ? 'Update Project' : 'Add Project'}
        </button>
      </form>
    </div>
  )
}