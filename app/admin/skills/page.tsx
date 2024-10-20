"use client";

import { FormEvent, useEffect, useState } from "react";
import { Cable, Edit, Trash } from "lucide-react";
import { Code, Database, Server } from "lucide-react";
import { ISkill } from "@/interfaces_types/interfaces_types";
import { getSkills } from "@/app/(utils)/functions";
import { addSkill, deleteSkill, updateSkill } from "../(functions)/functions";
import { validationSkill } from "@/app/(utils)/validations";

export default function SkillsPage() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [error, setError] = useState("");
  const emptySkill = {
    icon: "",
    title: "",
    skill: "",
  };
  const [newSkill, setNewSkill] = useState<Omit<ISkill, "_id">>(emptySkill);

  useEffect(() => {
    getSkills().then(({ data }) => setSkills(data));
  }, []);

  const iconLibrary = {
    Code: <Code size={48} className="mx-auto mb-4 text-emerald-700" />,
    Database: <Database size={48} className="mx-auto mb-4 text-emerald-700" />,
    Server: <Server size={48} className="mx-auto mb-4 text-emerald-700" />,
    Cable: <Cable size={48} className="mx-auto mb-4 text-emerald-700" />,
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newSkill);
    if (validationSkill(newSkill, setError)) {
      addSkill(newSkill).then(({ data }) => {
        setSkills([...skills, data]);
        setNewSkill(emptySkill);
      });
    }
  };

  const handleUpdateSkill = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editedSkill = { _id: editingId, ...newSkill };
    console.log(editedSkill);
    updateSkill(editedSkill).then(() => {
      const updatedSkills = skills.map((item) => {
        return item._id === editingId ? editedSkill : item;
      });
      setSkills(updatedSkills);
      setNewSkill(emptySkill);
      setEditingId("");
    });
  };

  const handleEditSkill = (editId: string) => {
    setEditingId(editId);
    const skillToEdit = skills.find((skill) => skill._id === editId);
    if (skillToEdit) {
      const { _id, ...skillWithoutId } = skillToEdit;
      console.log(_id + Math.floor(Math.random() * 10000));
      setNewSkill(skillWithoutId);
    }
  };

  const handleDeleteSkill = (id: string) => {
    deleteSkill(id).then(() => {
      setSkills(skills.filter((skill) => skill._id !== id));
    });
  };

  const handleOnChange = (key: string, value: string) => {
    setNewSkill((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const clearSkill = () => {
    setNewSkill(emptySkill);
    setEditingId("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>

      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Current Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => {
            return (
              <div
                key={skill._id}
                className="p-6 ml-2 bg-white rounded-lg shadow-md border border-gray-200"
              >
                {iconLibrary[skill.icon as keyof typeof iconLibrary]}
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-gray-600">{skill.skill}</p>
                <div className="flex mt-1 space-x-2">
                  <button
                    onClick={() => handleEditSkill(skill._id)}
                    className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill._id)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={editingId ? handleUpdateSkill : handleAddSkill}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Edit Skill" : "Add New Skill"}
          </h2>
          <button
            type="button"
            onClick={() => clearSkill()}
            className="mt-2 ml-auto mb-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {error && <p className="text-red-600 mb-1">{error}</p>}
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Icon
            </label>
            <input
              type="text"
              id="icon"
              value={newSkill.icon}
              onChange={(e) => handleOnChange("icon", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newSkill.title}
              onChange={(e) => handleOnChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="skill"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Skill
          </label>
          <input
            type="text"
            id="title"
            value={newSkill.skill}
            onChange={(e) => handleOnChange("skill", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {editingId ? "Update Skill" : "Add Skill"}
        </button>
      </form>
    </div>
  );
}
