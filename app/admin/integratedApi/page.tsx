"use client";

import { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import { IIntegratedApi } from "@/interfaces_types/interfaces_types";
import { getIntegratedApiSchema } from "@/app/(utils)/functions";
import { addAPI, deleteApi, updateApi } from "../(functions)/functions";
import { validationApi } from "@/app/(utils)/validations";

export default function IntegratedAPIsPage() {
  const [apis, setAPIs] = useState<IIntegratedApi[]>([]);
  const [error, setError] = useState("");

  const emptyAPI = {
    _id: "",
    Title: "",
    Description: "",
    Docs: "",
  };
  const [newAPI, setNewAPI] = useState<IIntegratedApi>(emptyAPI);

  const [editingId, setEditingId] = useState<string>("");

  useEffect(() => {
    getIntegratedApiSchema().then(({ data }) => setAPIs(data));
  }, []);

  const handleAddAPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationApi(newAPI, setError)) {
      addAPI(newAPI).then(() => {
        setAPIs([...apis, newAPI]);
        setNewAPI(emptyAPI);
      });
    }
  };

  const handleUpdateAPI = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedApi: IIntegratedApi = { ...newAPI, _id: editingId };
    if (validationApi(newAPI, setError)) {
      updateApi(updatedApi).then(() => {
        setAPIs(apis.map((api) => (api._id === editingId ? updatedApi : api)));
        setNewAPI(emptyAPI);
        setEditingId("");
      });
    }
  };

  const handleDeleteAPI = (id: string) => {
    deleteApi(id).then(() => {
      setAPIs(apis.filter((api) => api._id !== id));
    });
  };

  const handleEditAPI = (id: string) => {
    const apiToEdit = apis.find((api) => api._id === id);
    if (apiToEdit) {
      setNewAPI(apiToEdit);
      setEditingId(id);
    }
  };

  const clearEdit = () => {
    setEditingId("");
    setNewAPI(emptyAPI);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Integrated APIs</h1>

      {/* List current APIs */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Integrated APIs</h2>
        <div className="space-y-4">
          {apis.map((api) => (
            <div key={api._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{api.Title}</h3>
              <p className="text-gray-600 mb-2">{api.Description}</p>
              <a
                href={api.Docs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mb-4 inline-block"
              >
                Documentation
              </a>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEditAPI(api._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteAPI(api._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit API form */}
      <form
        onSubmit={editingId ? handleUpdateAPI : handleAddAPI}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Edit Integrated API" : "Add New Integrated API"}
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
            value={newAPI.Title}
            onChange={(e) => setNewAPI({ ...newAPI, Title: e.target.value })}
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
            id="Description"
            value={newAPI.Description}
            onChange={(e) =>
              setNewAPI({ ...newAPI, Description: e.target.value })
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
            id="docs"
            value={newAPI.Docs}
            onChange={(e) => setNewAPI({ ...newAPI, Docs: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          {editingId ? "Update Integrated API" : "Add Integrated API"}
        </button>
      </form>
    </div>
  );
}
