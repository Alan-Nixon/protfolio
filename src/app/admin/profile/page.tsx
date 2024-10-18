'use client'

import { useState, useRef } from 'react'
import { User } from 'lucide-react'

interface Profile {
  name: string
  email: string
  bio: string
  description: string
  profileImage: string
  githubLink: string
  linkedInLink: string
  instaLink: string
  stackLink: string
  gitlabLink: string
  npmLink: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Full-stack developer passionate about creating innovative solutions.',
    description: 'I have 5 years of experience in web development, specializing in React and Node.js.',
    profileImage: '/placeholder.svg?height=200&width=200',
    githubLink: 'https://github.com/johndoe',
    linkedInLink: 'https://linkedin.com/in/johndoe',
    instaLink: 'https://instagram.com/johndoe',
    stackLink: 'https://stackoverflow.com/users/123456/johndoe',
    gitlabLink: 'https://gitlab.com/johndoe',
    npmLink: 'https://www.npmjs.com/~johndoe',
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile({ ...profile, profileImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile)
    alert('Profile updated successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6 flex items-center">
          <div className="mr-4">
            {profile.profileImage ? (
              <img src={profile.profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Change Profile Picture
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={profile.description}
            onChange={handleChange}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">
            GitHub Link
          </label>
          <input
            type="url"
            id="githubLink"
            name="githubLink"
            value={profile.githubLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="linkedInLink" className="block text-sm font-medium text-gray-700">
            LinkedIn Link
          </label>
          <input
            type="url"
            id="linkedInLink"
            name="linkedInLink"
            value={profile.linkedInLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="instaLink" className="block text-sm font-medium text-gray-700">
            Instagram Link
          </label>
          <input
            type="url"
            id="instaLink"
            name="instaLink"
            value={profile.instaLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="stackLink" className="block text-sm font-medium text-gray-700">
            Stack Overflow Link
          </label>
          <input
            type="url"
            id="stackLink"
            name="stackLink"
            value={profile.stackLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gitlabLink" className="block text-sm font-medium text-gray-700">
            GitLab Link
          </label>
          <input
            type="url"
            id="gitlabLink"
            name="gitlabLink"
            value={profile.gitlabLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="npmLink" className="block text-sm font-medium text-gray-700">
            npm Link
          </label>
          <input
            type="url"
            id="npmLink"
            name="npmLink"
            value={profile.npmLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  )
}