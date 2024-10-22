"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash, X } from "lucide-react";
import { IExperience } from "@/interfaces_types/interfaces_types";
import { getExperience } from "@/app/(utils)/functions";
import {
  addExperience,
  deleteExperience,
  updateExperience,
} from "../(functions)/functions";
import { validationExperience } from "@/app/(utils)/validations";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getExperience().then(({ data }) => setExperiences(data));
  }, []);

  const emptyExp = {
    title: "",
    companyName: "",
    roles: [],
    achievements: [],
  };

  const [newExperience, setNewExperience] =
    useState<Omit<IExperience, "_id">>(emptyExp);

  const [editingId, setEditingId] = useState<string>("");

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationExperience(newExperience, setError)) {
      addExperience(newExperience).then(({ data }) => {
        setExperiences([...experiences, data]);
        setNewExperience(emptyExp);
      });
    }
  };

  const handleUpdateExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationExperience(newExperience, setError)) {
      updateExperience({ _id: editingId, ...newExperience }).then(() => {
        setExperiences(
          experiences.map((exp) =>
            exp._id === editingId ? { ...newExperience, _id: exp._id } : exp
          )
        );
        setNewExperience(emptyExp);
        setEditingId("");
      });
    }
  };

  const handleDeleteExperience = (id: string) => {
    deleteExperience(id).then(() => {
      setExperiences(experiences.filter((exp) => exp._id !== id));
    });
  };

  const handleEditExperience = (id: string) => {
    const experienceToEdit = experiences.find((exp) => exp._id === id);
    if (experienceToEdit) {
      setNewExperience(experienceToEdit);
      setEditingId(id);
    }
  };

  const handleAddRole = () => {
    setNewExperience({ ...newExperience, roles: [...newExperience.roles, ""] });
  };

  const handleRemoveRole = (index: number) => {
    setNewExperience({
      ...newExperience,
      roles: newExperience.roles.filter((_, i) => i !== index),
    });
  };

  const handleRoleChange = (index: number, value: string) => {
    const updatedRoles = [...newExperience.roles];
    updatedRoles[index] = value;
    setNewExperience({ ...newExperience, roles: updatedRoles });
  };

  const handleAddAchievement = () => {
    setNewExperience({
      ...newExperience,
      achievements: [...newExperience.achievements, ""],
    });
  };

  const handleRemoveAchievement = (index: number) => {
    setNewExperience({
      ...newExperience,
      achievements: newExperience.achievements.filter((_, i) => i !== index),
    });
  };

  const handleAchievementChange = (index: number, value: string) => {
    const updatedAchievements = [...newExperience.achievements];
    updatedAchievements[index] = value;
    setNewExperience({ ...newExperience, achievements: updatedAchievements });
  };
  const clearEdit = () => {
    setEditingId("");
    setNewExperience(emptyExp);
  };
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Experience</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Experiences</h2>
        <div className="space-y-4">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-white p-6 rounded-lg shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{experience.title}</h3>
                  <p className="text-gray-600">{experience.companyName}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditExperience(experience._id)}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(experience._id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold">Roles:</h4>
                <ul className="list-disc list-inside">
                  {experience.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Achievements:</h4>
                <ul className="list-disc list-inside">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit experience form */}
      <form
        onSubmit={editingId ? handleUpdateExperience : handleAddExperience}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Edit Experience" : "Add New Experience"}
          </h2>
          <button
            type="button"
            onClick={() => clearEdit()}
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
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({ ...newExperience, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={newExperience.companyName}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  companyName: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Roles
          </label>
          {newExperience.roles.map((role, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={role}
                onChange={(e) => handleRoleChange(index, e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveRole(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRole}
            className="mt-2 px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            <Plus size={16} className="inline mr-1" /> Add Role
          </button>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Achievements
          </label>
          {newExperience.achievements.map((achievement, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveAchievement(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAchievement}
            className="mt-2 px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            <Plus size={16} className="inline mr-1" /> Add Achievement
          </button>
        </div>
        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {editingId ? "Update Experience" : "Add Experience"}
        </button>
      </form>
    </div>
  );
}
