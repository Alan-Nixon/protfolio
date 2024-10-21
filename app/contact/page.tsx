"use client";

import { useState } from "react";
import { Github, Linkedin, Instagram, FileCode, GitBranch } from "lucide-react";
import { FaNpm as Npm } from "react-icons/fa";
import { useUser } from "../(utils)/customHooks";
import { IContact } from "@/interfaces_types/interfaces_types";
import { submitContact } from "../(utils)/functions";
import { validationContact } from "../(utils)/validations";

export default function Contact() {
  const { user } = useUser();
  const [error, setError] = useState("");
  const emptyContact = {
    name: "",
    email: "",
    message: "",
  };
  const [formData, setFormData] =
    useState<Omit<IContact, "_id" | "createdAt">>(emptyContact);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationContact(formData, setError)) {
      submitContact(formData).then(() => {
        setFormData(emptyContact);
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
          <div className="mb-8">
            <img
              src={user.profileImage}
              alt="Your Name"
              className="rounded-full w-48 h-48 object-cover mx-auto md:mx-0"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={user.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800"
            >
              <Github size={24} />
            </a>
            <a
              href={user.linkedInLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={user.instaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800"
            >
              <Instagram size={24} />
            </a>
            <a
              href={user.stackLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800"
            >
              <FileCode size={24} />
            </a>
            <a
              href={user.gitlabLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800"
            >
              <GitBranch size={24} />
            </a>
            <a
              href={user.npmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800"
            >
              <Npm size={30} />
            </a>
          </div>
          <p className="text-gray-600 mb-4">
            Feel free to reach out to me through any of these platforms or use
            the contact form.
          </p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-emerald-50 p-8 rounded-lg shadow-md"
          >
            {error && <p className="text-red-600">{error}</p>}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-emerald-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-emerald-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-emerald-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
