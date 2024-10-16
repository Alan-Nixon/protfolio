import Link from 'next/link'

export default function Projects() {
  const projects = [
    { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce solution with React and Node.js.' },
    { id: 2, title: 'Task Management App', description: 'A productivity app built with Next.js and MongoDB.' },
    { id: 3, title: 'Weather Dashboard', description: 'A real-time weather app using React and a weather API.' },
    { id: 4, title: 'Social Media Analytics Tool', description: 'Data visualization for social media metrics using D3.js.' },
    { id: 5, title: 'Fitness Tracker', description: 'A mobile app for tracking workouts and nutrition, built with React Native.' },
    { id: 6, title: 'Code Snippet Manager', description: 'A tool for developers to store and share code snippets, using Vue.js and Firebase.' },
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-12 text-center">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <img src={`/placeholder.svg?height=200&width=400&text=Project+${project.id}`} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <Link href={`/project`} className="text-emerald-700 hover:underline">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}