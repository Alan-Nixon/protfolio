"use client";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { useProject } from "@/app/(utils)/customHooks";
import { IProject } from "@/app/interfaces_types/interfaces_types";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  let { project } = useProject();
  const data = project.find((p: IProject) => p._id === "123");
  console.log(project, data);
  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/projects"
        className="inline-flex items-center text-emerald-700 hover:underline mb-8"
      >
        <ArrowLeft className="mr-2" /> Back to projects
      </Link>

      <h1 className="text-4xl font-bold mb-6">{data.Title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-gray-600 mb-6">{data.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {data.technologies.map((tech, index) => (
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
              href={data.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-emerald-700 hover:underline"
            >
              <Github className="mr-2" /> View on GitHub
            </a>
            <a
              href={data.link}
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
            src={data.images[0]}
            alt={data.Title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {data.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${data.Title} screenshot ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Project Demo Video</h2>
      <div className="aspect-w-16 aspect-h-9 mb-12">
        <iframe
          src={data.videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-md"
        ></iframe>
      </div>
    </div>
  );
}
