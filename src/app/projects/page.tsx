"use client"
import Link from "next/link";
import { IProject } from "../interfaces_types/interfaces_types";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  useEffect(() => {
    const data: IProject[] = [
      {
        _id: Math.random() * 1000000 + "",
        githubLink: "",
        link: "",
        projectImage: "",
        Title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with React and Node.js.",
      },
      {
        _id: Math.random() * 1000000 + "",
        githubLink: "",
        link: "",
        projectImage: "",
        Title: "Task Management App",
        description: "A productivity app built with Next.js and MongoDB.",
      },
      {
        _id: Math.random() * 1000000 + "",
        githubLink: "",
        link: "",
        projectImage: "",
        Title: "Weather Dashboard",
        description: "A real-time weather app using React and a weather API.",
      },
      {
        _id: Math.random() * 1000000 + "",
        githubLink: "",
        link: "",
        projectImage: "",
        Title: "Social Media Analytics Tool",
        description: "Data visualization for social media metrics using D3.js.",
      },
      {
        _id: Math.random() * 1000000 + "",
        githubLink: "",
        link: "",
        projectImage: "",
        Title: "Fitness Tracker",
        description:
          "A mobile app for tracking workouts and nutrition, built with React Native.",
      },
      {
        _id: Math.random() * 1000000 + "",
        githubLink: "",
        link: "",
        projectImage: "",
        Title: "Code Snippet Manager",
        description:
          "A tool for developers to store and share code snippets, using Vue.js and Firebase.",
      },
    ];
    setProjects(data);
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-12 text-center">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
          >
            <img
              src={`/placeholder.svg?height=200&width=400&text=Project+${project._id}`}
              alt={project.Title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{project.Title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <Link
                href={`/project`}
                className="text-emerald-700 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
