"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { IUser } from "@/interfaces_types/interfaces_types";
import { getUser } from "@/app/(utils)/functions";
import {
  validateEmail,
  validateName,
  validateURL,
} from "react-values-validator";
import { changeProfile } from "../(functions)/functions";

export default function ProfilePage() {
  const [profile, setProfile] = useState<IUser>({
    name: "",
    Email: "",
    bio: "",
    description: "",
    profileImage: "",
    githubLink: "",
    linkedInLink: "",
    instaLink: "",
    stackLink: "",
    gitlabLink: "",
    npmLink: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    getUser().then(({ data }) => setProfile(data));
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setError("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateDescription = (desc: string) => {
    const trimmedDesc = desc.trim();
    const hasThreeAlphabeticChars = /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(trimmedDesc);
    const hasMoreThanThreeWords = trimmedDesc.split(/\s+/).length > 3;  
    return hasThreeAlphabeticChars && hasMoreThanThreeWords;
  };
  
  
  

  const validations = () => {
    if (!validateName(profile.name)) {
      setError("Enter a valid Name");
      return false;
    }
    if (!validateEmail(profile.Email)) {
      setError("Enter a valid Email");
      return false;
    }
    if (!validateDescription(profile.description)) {
      setError("Enter a valid Description");
      return false;
    }
    if (!validateDescription(profile.bio)) {
      setError("Enter a valid Bio");
      return false;
    }
    if (!validateURL(profile.githubLink)) {
      setError("Enter a valid Github link");
      return false;
    }
    if (!validateURL(profile.linkedInLink)) {
      setError("Enter a valid Linkedin");
      return false;
    }
    if (!validateURL(profile.instaLink)) {
      setError("Enter a valid insta Link");
      return false;
    }
    if (!validateURL(profile.stackLink)) {
      setError("Enter a valid Stack overflow link");
      return false;
    }
    if (!validateURL(profile.gitlabLink)) {
      setError("Enter a valid git lab link");
      return false;
    }
    if (!validateURL(profile.npmLink)) {
      setError("Enter a valid npm link");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validations()) {
      changeProfile(profile)
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6 flex items-center">
          <div className="mr-4">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Change Profile Picture
            </button>
          </div>
        </div>

        <div className="mb-4">
          {error && <p className="text-red-600">{error}</p>}
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="Email"
            value={profile.Email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={profile.description}
            onChange={handleChange}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="githubLink"
            className="block text-sm font-medium text-gray-700"
          >
            GitHub Link
          </label>
          <input
            type="url"
            id="githubLink"
            name="githubLink"
            value={profile.githubLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="linkedInLink"
            className="block text-sm font-medium text-gray-700"
          >
            LinkedIn Link
          </label>
          <input
            type="url"
            id="linkedInLink"
            name="linkedInLink"
            value={profile.linkedInLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="instaLink"
            className="block text-sm font-medium text-gray-700"
          >
            Instagram Link
          </label>
          <input
            type="url"
            id="instaLink"
            name="instaLink"
            value={profile.instaLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stackLink"
            className="block text-sm font-medium text-gray-700"
          >
            Stack Overflow Link
          </label>
          <input
            type="url"
            id="stackLink"
            name="stackLink"
            value={profile.stackLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="gitlabLink"
            className="block text-sm font-medium text-gray-700"
          >
            GitLab Link
          </label>
          <input
            type="url"
            id="gitlabLink"
            name="gitlabLink"
            value={profile.gitlabLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="npmLink"
            className="block text-sm font-medium text-gray-700"
          >
            npm Link
          </label>
          <input
            type="url"
            id="npmLink"
            name="npmLink"
            value={profile.npmLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
