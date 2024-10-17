"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfileDetails } from "../(functions)/functions";
import { IUser } from "../../interfaces_types/interfaces_types";

export default function EditProfile() {
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const [profile, setProfile] = useState<IUser>({
    bio: "",
    githubLink: "",
    gitlabLink: "",
    description: "",
    linkedInLink: "",
    instaLink: "",
    Email: "",
    stackLink: "",
    name: "",
    profileImage: "",
    npmLink: "",
  });

  useEffect(() => {
    getProfileDetails().then(({ data }) => {
      setProfile(data);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Profile updated:", profile);
    if (image) {
      console.log("New profile image:", image);
    }
    // Redirect back to the admin dashboard
    router.push("/admin/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl text-center font-bold mb-8">Edit Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.Email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium mb-2"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
