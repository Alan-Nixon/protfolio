'use client'

import { useState } from 'react'
import { Plus, Edit, Trash, X } from 'lucide-react'

interface Education {
  id: number
  title: string
  institution: string
  year: string
  details: string[]
}

export default function EducationPage() {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: 1,
      title: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      year: '2018-2022',
      details: [
        'Graduated with honors',
        'Specialized in Artificial Intelligence',
        'Completed a thesis on machine learning algorithms',
      ],
    },
  ])

  const [newEducation, setNewEducation] = useState({
    title: '',
    institution: '',
    year: '',
    details: [''],
  })

  const [editingId, setEditingId] = useState<number | null>(null)

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault()
    setEducations([...educations, { id: Date.now(), ...newEducation }])
    setNewEducation({ title: '', institution: '', year: '', details: [''] })
  }

  const handleEditEducation = (id: number) => {
    const educationToEdit = educations.find((edu) => edu.id === id)
    if (educationToEdit) {
      setNewEducation(educationToEdit)
      setEditingId(id)
    }
  }

  const handleUpdateEducation = (e: React.FormEvent) => {
    e.preventDefault()
    setEducations(
      educations.map((edu) => (edu.id === editingId ? { ...newEducation, id: edu.id } : edu))
    )
    setNewEducation({ title: '', institution: '', year: '', details: [''] })
    setEditingId(null)
  }

  const handleDeleteEducation = (id: number) => {
    setEducations(educations.filter((edu) => edu.id !== id))
  }

  const handleAddDetail = () => {
    setNewEducation({ ...newEducation, details: [...newEducation.details, ''] })
  }

  const handleRemoveDetail = (index: number) => {
    setNewEducation({
      ...newEducation,
      details: newEducation.details.filter((_, i) => i !== index),
    })
  }

  const handleDetailChange = (index: number, value: string) => {
    const updatedDetails = [...newEducation.details]
    updatedDetails[index] = value
    setNewEducation({ ...newEducation, details: updatedDetails })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Education</h1>

      {/* List current education */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Education</h2>
        {educations.map((edu) => (
          <div key={edu.id} className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-xl font-semibold">{edu.title}</h3>
            <p className="text-gray-600">
              {edu.institution} | {edu.year}
            </p>
            <ul className="list-disc list-inside mt-2">
              {edu.details.map((detail, index) => (
                <li key={index} className="text-gray-700">
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEditEducation(edu.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDeleteEducation(edu.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit education form */}
      <form onSubmit={editingId ? handleUpdateEducation : handleAddEducation} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? 'Edit Education' : 'Add New Education'}
        </h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={newEducation.title}
            onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
            Institution
          </label>
          <input
            type="text"
            id="institution"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="text"
            id="year"
            value={newEducation.year}
            onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
          {newEducation.details.map((detail, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={detail}
                onChange={(e) => handleDetailChange(index, e.target.value)}
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveDetail(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDetail}
            className="mt-2 px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            <Plus size={16} className="inline mr-1" /> Add Detail
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          {editingId ? 'Update Education' : 'Add Education'}
        </button>
      </form>
    </div>
  )
}