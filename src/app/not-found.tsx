import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-emerald-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Project Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the project you're looking for.</p>
        <Link href="/projects" className="bg-emerald-700 text-white px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors">
          Back to Projects
        </Link>
      </div>
    </div>
  )
}