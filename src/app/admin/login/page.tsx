"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "react-values-validator";
import { signIn, useSession } from "next-auth/react";
import LoadingPage from "@/app/(componenets)/LoadinPage";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ Email: "", Password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/admin/dashboard");
    } else {
      if (status !== "loading") {
        setLoading(false);
      }
    }
  }, [session, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(credentials.Email)) {
      setError("Enter a valid Email");
      return false;
    }

    if (!validatePassword(credentials.Password)) {
      setError("Enter a valid Password");
      return false;
    }

    signIn("credentials", {
      redirect: false,
      email: credentials.Email,
      password: credentials.Password,
    }).then((result) => {
      // if (!result?.ok) {
      //   setLoading(false);
      //   setError("Invalid Email or Password try again");
      // } else {
      //   router.push("/admin/dashboard");
      console.log(result,"this is the result")
        setTimeout(() => setLoading(false), 0);
      // }
    });
    router.push("/admin/dashboard");
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <div className="mb-4">
          {error && <p className="text-red-500 mb-1">{error}</p>}
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="Email"
            value={credentials.Email}
            onChange={(e) => handleChange(e)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="Password"
            value={credentials.Password}
            onChange={(e) => handleChange(e)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
          className="w-full bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
