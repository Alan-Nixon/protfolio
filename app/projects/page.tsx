"use client";
import Link from "next/link";
import {
  IProject,
  ITextSection,
} from "../../interfaces_types/interfaces_types";
import { useEffect, useState } from "react";
import { getProjects } from "../(utils)/functions";
import Image from "next/image";
import { motion } from "framer-motion";
import { CircleLoader } from "../(components)/LoadingPage";
import { TextImageSection } from "../(components)/TextImage";

export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(({ data }) => {
      setLoading(false);
      setProjects([...data.mainProjects, ...data.miniProjects]);
    });
  }, []);

  const data: ITextSection = {
    title: "How should we work together?",
    description: `I can work with you to bring your project to life efficiently. If you already have a design, such as a Figma file, it will streamline the development process. Please provide a list of features you need in your project so we can plan accordingly. Additionally, sharing your budget helps in deciding the scalability of the application. Payments will be structured based on implemented features, with an initial phase of basic completion before moving forward. Let’s build something great together!`,
    imageSrc: "/shake-hands.webp",
    buttonLink: "/services",
    buttonText: "Go to Services",
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="relative w-full h-[250px] mb-12 rounded-xl overflow-hidden">
        <Image
          src="/bg-product.webp"
          alt="Technical documentation and resources"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Projects Section
            </h1>
            <p className="max-w-2xl mx-auto text-gray-200">
              Explore my projects and see how I bring ideas to life. From web
              development to seamless integrations
            </p>
          </motion.div>
        </div>
      </div>
      <TextImageSection data={data} />

      <h1 className="text-4xl font-bold mb-12 text-center">My Projects</h1>
      {loading ? (
        <CircleLoader />
      ) : (
        <>
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
                  <h2 className="text-xl font-semibold mb-2">
                    {project.Title}
                  </h2>
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
        </>
      )}
    </div>
  );
}
