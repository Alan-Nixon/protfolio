"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Edit, Trash, X } from "lucide-react";
import { IProject } from "@/interfaces_types/interfaces_types";
import { getProjects } from "@/app/(utils)/functions";
import { validationProject } from "@/app/(utils)/validations";
import {
  AddProject,
  deleteProject,
  updateProject,
} from "../(functions)/functions";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [error, setError] = useState<string>("");

  const emptyProject = {
    Title: "",
    projectImage: "",
    description: "",
    link: "",
    githubLink: "",
    videoUrl: "",
    images: [],
    technologies: [],
    mainProject: true,
  };

  const [newProject, setNewProject] =
    useState<Omit<IProject, "_id">>(emptyProject);

  const [editingId, setEditingId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProjects().then(({ data }) => {
      setProjects([...data.mainProjects, ...data.miniProjects]);
    });
  }, []);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newProject);
    if (validationProject(newProject, setError)) {
      AddProject(newProject).then(({ data }) => {
        setProjects([...projects, data]);
        setNewProject(emptyProject);
      });
    }
  };

  const handleEditProject = (id: string) => {
    const projectToEdit = projects.find((project) => project._id === id);
    if (projectToEdit) {
      setNewProject(projectToEdit);
      setEditingId(id);
    }
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationProject(newProject, setError)) {
      const projectWithId = { ...newProject, _id: editingId };
      updateProject(projectWithId).then(() => {
        const updatedProjects = projects.map((item) =>
          item._id === editingId ? projectWithId : item
        );
        setProjects(updatedProjects);
        setNewProject(emptyProject)
        setEditingId("");
      });
    }
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id).then(() => {
      setProjects(projects.filter((project) => project._id !== id));
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject({ ...newProject, projectImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setNewProject({
              ...newProject,
              images: [...newProject.images, ...newImages],
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewProject({
      ...newProject,
      images: newProject.images.filter((_, i) => i !== index),
    });
  };

  const handleAddTechnology = () => {
    setNewProject({
      ...newProject,
      technologies: [...newProject.technologies, ""],
    });
  };

  const handleRemoveTechnology = (index: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== index),
    });
  };

  const handleTechnologyChange = (index: number, value: string) => {
    const updatedTechnologies = [...newProject.technologies];
    updatedTechnologies[index] = value;
    setNewProject({ ...newProject, technologies: updatedTechnologies });
  };

  const clearProject = () => {
    setNewProject(emptyProject);
    setEditingId("");
  };

  const onChangeValues = (key: string, value: string | boolean) => {
    setNewProject({ ...newProject, [key]: value });
    setError("");
  };

  const renderProjects = (type: boolean) => (
    <div className="space-y-6">
      {projects
        .filter((project) => project.mainProject === type)
        .map((project) => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col md:flex-row md:items-center mb-4">
              <img
                src={project.projectImage}
                alt={project.Title}
                className="w-full md:w-48 h-32 object-cover rounded mr-4 mb-4 md:mb-0"
              />
              <div>
                <h3 className="text-xl font-semibold">{project.Title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Live Demo
              </a>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
            </div>
            {project.videoUrl && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Project Video</h4>
                <video
                  src={project.videoUrl}
                  controls
                  className="w-full max-w-md mx-auto rounded"
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEditProject(project._id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Main Projects</h2>
        {renderProjects(true)}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mini Projects</h2>
        {renderProjects(false)}
      </div>

      <form
        onSubmit={editingId ? handleUpdateProject : handleAddProject}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            type="button"
            onClick={() => clearProject()}
            className="mt-2 ml-auto mb-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {error && <p className="text-red-600">{error}</p>}
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newProject.Title}
              onChange={(e) => onChangeValues("Title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="projectImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project Image
            </label>
            <input
              type="file"
              id="projectImage"
              onChange={handleImageUpload}
              accept="image/*"
              ref={fileInputRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={newProject.description}
            onChange={(e) => onChangeValues("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Live Demo Link
            </label>
            <input
              type="url"
              id="link"
              value={newProject.link}
              onChange={(e) => onChangeValues("link", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="githubLink"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              GitHub Link
            </label>
            <input
              type="url"
              id="githubLink"
              value={newProject.githubLink}
              onChange={(e) => onChangeValues("githubLink", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="videoUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Video Link
            </label>
            <input
              type="url"
              id="videoUrl"
              value={newProject.videoUrl}
              onChange={(e) => onChangeValues("videoUrl", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Images
          </label>
          <input
            type="file"
            id="images"
            onChange={handleMultipleImageUpload}
            accept="image/*"
            multiple
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {newProject.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Additional ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Technologies
          </label>
          {newProject.technologies.map((tech, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechnologyChange(index, e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveTechnology(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTechnology}
            className="mt-2  px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            <Plus size={16} className="inline mr-1" /> Add Technology
          </button>
        </div>
        <div className="mt-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Type
          </label>
          <select
            id="type"
            value={newProject.mainProject ? "main" : "mini"}
            onChange={(e) =>
              onChangeValues("mainProject", e.target.value === "main")
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="main">Main Project</option>
            <option value="mini">Mini Project</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
}
