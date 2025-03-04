"use client";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { IProject } from "@/interfaces_types/interfaces_types";
import LoadingPage from "@/app/(components)/LoadingPage";
import { useEffect, useState } from "react";
import { getProjects } from "@/app/(utils)/functions";
import ImageSlider from "@/app/(components)/image-slider";

export default function ProjectDetail({
  params,
}: {
  params: { productId: string };
}) {
  const [data, setData] = useState<IProject>();
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    getProjects().then(({ data }) => {
      const project = [...data.mainProjects, ...data.miniProjects].find(
        (p) => p._id === params.productId
      );
      setData(project);
    });
  }, []);

  if (!data) {
    return <LoadingPage />;
  }

  const openSlider = (index: number) => {
    setCurrentImageIndex(index);
    setIsSliderOpen(true);
  };

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
            src={data.projectImage}
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
            onClick={() => openSlider(index)}
            alt={`${data.Title} screenshot ${index + 1}`}
            className="transition-transform duration-300 hover:scale-105 cursor-pointer w-full h-auto rounded-lg shadow-md"
          />
        ))}
      </div>
      <ImageSlider
        images={data.images}
        initialIndex={currentImageIndex}
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
      />
      <h2 className="text-2xl font-bold mb-4">Project Demo Video</h2>
      <div className="aspect-w-16 aspect-h-9 mb-12 bg-gray-800 p-3 max-w-[750px]">
        <video src={data.videoUrl} controls autoPlay className="w-full" />
      </div>
    </div>
  );
}
