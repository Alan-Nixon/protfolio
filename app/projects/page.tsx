"use client";
import Link from "next/link";
import { IProject } from "../../interfaces_types/interfaces_types";
import { useEffect, useState } from "react";
import { getProjects } from "../(utils)/functions";
import Image from "next/image";


export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    getProjects().then(({ data }) =>
      setProjects([...data.mainProjects, ...data.miniProjects])
    );
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
            <Image
              src={project.projectImage}
              alt={project.Title}
              width={400}
              height={192}  
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{project.Title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="font-bold text-red-600">
                {project.mainProject ? "Main Project" : "Mini Project"}
              </p>
              <Link
                href={`/singleProject/${project._id}`}
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
