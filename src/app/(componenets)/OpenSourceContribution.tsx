"use client";

import { Github } from "lucide-react";
import Link from "next/link";

export default function OpenSourceContribution() {
  const openSourceProjects = [
    {
      title: "React Component Library",
      description:
        "Contributed to an open-source React component library, adding new components and improving documentation.",
    },
    {
      title: "JavaScript Framework Plugin",
      description:
        "Developed a plugin for a popular JavaScript framework, enhancing its functionality and performance.",
    },
    {
      title: "Node.js Utility",
      description:
        "Fixed bugs and improved documentation for a widely-used Node.js utility, increasing its reliability and ease of use.",
    },
    {
      title: "Python Package",
      description:
        "Created a new feature for a widely-used Python package, expanding its capabilities and user base.",
    },
    {
      title: "Open Source CMS",
      description:
        "Contributed to the development of a popular open-source Content Management System, focusing on security enhancements.",
    },
    {
      title: "Machine Learning Library",
      description:
        "Implemented new algorithms and optimized existing ones in a machine learning library, improving its performance and accuracy.",
    },
  ];

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Open Source Contributions
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {openSourceProjects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              {project.description}
            </p>
            <Link
              href="#"
              className="text-emerald-700 hover:text-emerald-900 inline-flex items-center"
            >
              <Github className="mr-2" size={20} />
              View on GitHub
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
