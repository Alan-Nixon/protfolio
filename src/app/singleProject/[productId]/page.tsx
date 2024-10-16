import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

// This is a mock function to simulate fetching project data
// In a real application, you would fetch this data from an API or database
function getProjectData(id: string = "1") {
  const projects = [
    {
      id: "1",
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution with React and Node.js. This project demonstrates the ability to create a complex, scalable web application with features like user authentication, product management, and order processing.",
      images: [
        `/placeholder.svg?height=400&width=600&text=E-commerce+Image+1`,
        `/placeholder.svg?height=400&width=600&text=E-commerce+Image+2`,
        `/placeholder.svg?height=400&width=600&text=E-commerce+Image+3`,
      ],
      github: "https://github.com/yourusername/ecommerce-platform",
      liveDemo: "https://ecommerce-demo-url.com",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Redux",
        "Stripe API",
      ],
    },
    {
      id: "2",
      title: "Task Management App",
      description:
        "A productivity app built with Next.js and MongoDB. This application helps users organize their tasks, set priorities, and track progress. It features real-time updates and a responsive design for seamless use across devices.",
      images: [
        `/placeholder.svg?height=400&width=600&text=Task+App+Image+1`,
        `/placeholder.svg?height=400&width=600&text=Task+App+Image+2`,
        `/placeholder.svg?height=400&width=600&text=Task+App+Image+3`,
      ],
      github: "https://github.com/yourusername/task-management-app",
      liveDemo: "https://task-app-demo-url.com",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      technologies: [
        "Next.js",
        "MongoDB",
        "Tailwind CSS",
        "React Query",
        "NextAuth.js",
      ],
    },
    // Add more projects as needed
  ];

  return projects.find((project) => project.id === id);
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = getProjectData(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/projects"
        className="inline-flex items-center text-emerald-700 hover:underline mb-8"
      >
        <ArrowLeft className="mr-2" /> Back to Projects
      </Link>

      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-gray-600 mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-emerald-700 hover:underline"
            >
              <Github className="mr-2" /> View on GitHub
            </a>
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-emerald-700 hover:underline"
            >
              <ExternalLink className="mr-2" /> Live Demo
            </a>
          </div>
        </div>
        <div>
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {project.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${project.title} screenshot ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Project Demo Video</h2>
      <div className="aspect-w-16 aspect-h-9 mb-12">
        <iframe
          src={project.videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-md"
        ></iframe>
      </div>
    </div>
  );
}
