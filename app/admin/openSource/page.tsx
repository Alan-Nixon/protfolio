"use client";

import { useEffect, useState } from "react";
import { Edit, Github, Trash } from "lucide-react";
import { IOpenSource } from "@/interfaces_types/interfaces_types";
import { getOpenSource } from "@/app/(utils)/functions";
import { validationOpenSource } from "@/app/(utils)/validations";
import { addOpenSource, deleteOpenSource, updateOpenSource } from "../(functions)/functions";

export default function IntegratedOsPage() {
  const [openSource, setOpenSource] = useState<IOpenSource[]>([]);
  const [error, setError] = useState("");

  const emptyOpenSource: IOpenSource = {
    _id: "",
    title: "",
    description: "",
    githubLink: "",
  };
  const [newOpenSource, setNewOpenSource] = useState<IOpenSource>(emptyOpenSource);

  const [editingId, setEditingId] = useState<string>("");

  useEffect(() => {
    getOpenSource().then(({ data }) => setOpenSource(data));
  }, []);

  const handleAddOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationOpenSource(newOpenSource, setError)) {
      addOpenSource(newOpenSource).then(() => {
        setOpenSource([...openSource, newOpenSource]);
        setNewOpenSource(emptyOpenSource);
      });
    }
  };

  const handleUpdateOS = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedOs: IOpenSource = { ...newOpenSource, _id: editingId };
    if (validationOpenSource(newOpenSource, setError)) {
      updateOpenSource(updatedOs).then(() => {
        setOpenSource(openSource.map((os) => (os._id === editingId ? updatedOs : os)));
        setNewOpenSource(emptyOpenSource);
        setEditingId("");
      });
    }
  };

  const handleDeleteOS = (id: string) => {
    deleteOpenSource(id).then(() => {
      setOpenSource(openSource.filter((os) => os._id !== id));
    });
  };

  const handleEditOS = (id: string) => {
    const osToEdit = openSource.find((os) => os._id === id);
    if (osToEdit) {
      setNewOpenSource(osToEdit);
      setEditingId(id);
    }
  };

  const clearEdit = () => {
    setEditingId("");
    setNewOpenSource(emptyOpenSource);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Manage Open Source Contribution
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Open Source</h2>
        <div className="space-y-4">
          {openSource.map((os) => (
            <div key={os._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{os.title}</h3>
              <p className="text-gray-600 mb-2">{os.description}</p>
              <a
                href={os.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mb-4 inline-flex"
              >
                <Github className="mr-1" />View on Github
              </a>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEditOS(os._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteOS(os._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <form
        onSubmit={editingId ? handleUpdateOS : handleAddOS}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Edit Open Source" : "Add Open Source"}
          </h2>
          <button
            type="button"
            onClick={() => clearEdit()}
            className="mt-2 ml-auto mb-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
        <div className="mb-4">
          {error && <p className="text-red-600">{error}</p>}
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={newOpenSource.title}
            onChange={(e) =>
              setNewOpenSource({ ...newOpenSource, title: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={newOpenSource.description}
            onChange={(e) =>
              setNewOpenSource({
                ...newOpenSource,
                description: e.target.value,
              })
            }
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="docs"
            className="block text-sm font-medium text-gray-700"
          >
            Documentation URL
          </label>
          <input
            type="url"
            id="githubLink"
            value={newOpenSource.githubLink}
            onChange={(e) =>
              setNewOpenSource({ ...newOpenSource, githubLink: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          {editingId ? "Update Open Source" : "Add Open Source"}
        </button>
      </form>
    </div>
  );
}
