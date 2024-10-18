"use client";
import { Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IOpenSource } from "../../interfaces_types/interfaces_types";
import { getOpenSource } from "@/app/(utils)/functions";

export default function OpenSourceContribution() {
  const [openSource, setOpenSource] = useState<IOpenSource[]>([]);

  useEffect(() => {
    getOpenSource().then(({ data }) => setOpenSource(data));
  }, []);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Open Source Contributions
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {openSource.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 mt-1 rounded-lg shadow-md border border-gray-200 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              {project.description}
            </p>
            <Link
              href={project.title}
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
