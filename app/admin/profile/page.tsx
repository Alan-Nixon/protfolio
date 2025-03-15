"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { IUser } from "@/interfaces_types/interfaces_types";
import { getUser } from "@/app/(utils)/functions";
import { changeProfile } from "../(functions)/functions";
import { profileValidations } from "@/app/(utils)/validations";
import Image from "next/image";

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
    setProfileData();
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function setProfileData() {
    getUser().then(({ data }) => setProfile(data));
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileValidations(profile, setError)) {
      changeProfile(profile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6 flex items-center">
          <div className="mr-4">
            {profile.profileImage ? (
              <Image
              src={profile.profileImage}
              alt="Profile"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
            
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex w-full">
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
            <button
              type="button"
              onClick={() => setProfileData()}
              className="px-4 ml-auto py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Revert Changes
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
