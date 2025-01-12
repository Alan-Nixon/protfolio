"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import NavBar from "./(components)/NavBar";
import LoadingPage from "./(components)/LoadingPage";

function ClientWrapper({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminPath = window.location.href.includes("admin");
    setIsAdmin(adminPath);
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      {!isAdmin ? (
        <>
          <NavBar />
          <main className="flex-grow">
            <SessionProvider>{children}</SessionProvider>
          </main>
          <footer className="py-6 text-center text-gray-500 border-t border-gray-200">
            <p>&copy; 2024 Alan Nixon. All rights reserved.</p>
          </footer>
        </>
      ) : (
        <main className="flex-grow">
          <SessionProvider>{children}</SessionProvider>
        </main>
      )}
    </>
  );
}

export default ClientWrapper;
