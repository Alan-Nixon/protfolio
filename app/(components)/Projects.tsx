"use client";

import { getProjects } from "@/app/(utils)/functions";
import { IProject } from "@/interfaces_types/interfaces_types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CircleLoader } from "./LoadingPage";

export function MainProject() {
  const [project, setProject] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(({ data }) => {
      setLoading(false);
      setProject(data.mainProjects);
    });
  }, []);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Main Projects</h2>
      {loading ? (
        <CircleLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.map((item) => (
            <div
              key={item._id}
              className="transition-transform duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
            >
              <Image
                src={item.projectImage}
                alt={`Project ${item.Title}`}
                width={500}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 reveal">
                  {" "}
                  {item.Title}{" "}
                </h3>
                <p className="text-gray-600 mb-4 reveal">{item.description} </p>
                <Link
                  href={`/singleProject/${item._id}`}
                  className="text-emerald-700 hover:underline"
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function MiniProject() {
  const [project, setProject] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(({ data }) => {
      setLoading(false);
      setProject(data.miniProjects);
    });
  }, []);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center reveal">
        Mini Projects
      </h2>
      {loading ? (
        <CircleLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
          {project.map((item) => (
            <div
              key={item._id}
              className="transition-transform duration-300 hover:scale-105 bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{item.Title}</h3>
              <p className="text-gray-600 mb-4">{item.description} </p>
              <Link
                href={`/singleProject/${item._id}`}
                className="text-emerald-700 hover:underline"
              >
                Show More
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
