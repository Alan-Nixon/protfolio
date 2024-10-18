"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import NavBar from "./(componenets)/NavBar";

function ClientWrapper({ children }: { children: ReactNode }) {
  const admin = window.location.href.includes("admin");
  return (
    <>
      {!admin ? (
        <>
          <NavBar />
          <main className="flex-grow">
            <SessionProvider>{children}</SessionProvider>
          </main>
          <footer className="py-6 text-center text-gray-500 border-t border-gray-200">
            <p>&copy; 2023 YourName. All rights reserved.</p>
          </footer>{" "}
        </>
      ) : (
        children
      )}
    </>
  );
}

export default ClientWrapper;
