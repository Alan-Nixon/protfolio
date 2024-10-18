'use client'

import { useState } from 'react'
import { Edit, Trash } from 'lucide-react'

interface Skill {
  id: number
  icon: string
  title: string
  skill: string
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, icon: '💻', title: 'Web Development', skill: 'Expert' },
    { id: 2, icon: '📱', title: 'Mobile Development', skill: 'Intermediate' },
    { id: 3, icon: '🎨', title: 'UI/UX Design', skill: 'Advanced' },
  ])

  const [newSkill, setNewSkill] = useState({
    icon: '',
    title: '',
    skill: '',
  })

  const [editingId, setEditingId] = useState<number | null>(null)

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    setSkills([...skills, { id: Date.now(), ...newSkill }])
    setNewSkill({ icon: '', title: '', skill: '' })
  }

  const handleEditSkill = (id: number) => {
    const skillToEdit = skills.find((skill) => skill.id === id)
    if (skillToEdit) {
      setNewSkill(skillToEdit)
      setEditingId(id)
    }
  }

  const handleUpdateSkill = (e: React.FormEvent) => {
    e.preventDefault()
    setSkills(
      skills.map((skill) => (skill.id === editingId ? { ...newSkill, id: skill.id } : skill))
    )
    setNewSkill({ icon: '', title: '', skill: '' })
    setEditingId(null)
  }

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>

      {/* List current skills */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Current Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{skill.icon}</span>
                  <h3 className="text-lg font-semibold">{skill.title}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditSkill(skill.id)}
                    className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">Skill: {skill.skill}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit skill form */}
      <form onSubmit={editingId ? handleUpdateSkill : handleAddSkill} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? 'Edit Skill' : 'Add New Skill'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
              Icon (emoji)
            </label>
            <input
              type="text"
              id="icon"
              value={newSkill.icon}
              onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newSkill.title}
              onChange={(e) => setNewSkill({ ...newSkill, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">
            Skill
          </label>
          <select
            id="skill"
            value={newSkill.skill}
            onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select a skill level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {editingId ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>
    </div>
  )
}