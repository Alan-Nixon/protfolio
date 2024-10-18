'use client'

import { useState } from 'react'
import { Plus, Edit, Trash } from 'lucide-react'

interface IntegratedAPI {
  id: number
  title: string
  description: string
  docs: string
}

export default function IntegratedAPIsPage() {
  const [apis, setAPIs] = useState<IntegratedAPI[]>([
    {
      id: 1,
      title: 'Stripe API',
      description: 'Payment processing integration for e-commerce functionality',
      docs: 'https://stripe.com/docs/api',
    },
    {
      id: 2,
      title: 'SendGrid API',
      description: 'Email service integration for transactional emails',
      docs: 'https://docs.sendgrid.com/api-reference',
    },
  ])

  const [newAPI, setNewAPI] = useState({
    title: '',
    description: '',
    docs: '',
  })

  const [editingId, setEditingId] = useState<number | null>(null)

  const handleAddAPI = (e: React.FormEvent) => {
    e.preventDefault()
    setAPIs([...apis, { id: Date.now(), ...newAPI }])
    setNewAPI({ title: '', description: '', docs: '' })
  }

  const handleEditAPI = (id: number) => {
    const apiToEdit = apis.find((api) => api.id === id)
    if (apiToEdit) {
      setNewAPI(apiToEdit)
      setEditingId(id)
    }
  }

  const handleUpdateAPI = (e: React.FormEvent) => {
    e.preventDefault()
    setAPIs(
      apis.map((api) => (api.id === editingId ? { ...newAPI, id: api.id } : api))
    )
    setNewAPI({ title: '', description: '', docs: '' })
    setEditingId(null)
  }

  const handleDeleteAPI = (id: number) => {
    setAPIs(apis.filter((api) => api.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Integrated APIs</h1>

      {/* List current APIs */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Integrated APIs</h2>
        <div className="space-y-4">
          {apis.map((api) => (
            <div key={api.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{api.title}</h3>
              <p className="text-gray-600 mb-2">{api.description}</p>
              <a href={api.docs} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-4 inline-block">
                Documentation
              </a>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEditAPI(api.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteAPI(api.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit API form */}
      <form onSubmit={editingId ? handleUpdateAPI : handleAddAPI} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? 'Edit Integrated API' : 'Add New Integrated API'}
        </h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={newAPI.title}
            onChange={(e) => setNewAPI({ ...newAPI, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={newAPI.description}
            onChange={(e) => setNewAPI({ ...newAPI, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="docs" className="block text-sm font-medium text-gray-700">
            Documentation URL
          </label>
          <input
            type="url"
            id="docs"
            value={newAPI.docs}
            onChange={(e) => setNewAPI({ ...newAPI, docs: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          {editingId ? 'Update Integrated API' : 'Add Integrated API'}
        </button>
      </form>
    </div>
  )
}