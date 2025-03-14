import "./globals.css";
import "../mongodbConnect/database";
import { Inter } from "next/font/google";
import { layoutProps } from "../interfaces_types/interfaces_types";
import ClientWrapper from "./ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alan Nixon - Software Engineer & MERN Freelancer",
  description: "Alan Nixon - A skilled MERN Stack Developer, Software Engineer, and Freelancer. Specializing in modern web development, React, Node.js, and scalable applications.",
  verification: {
    google: "oczS7ejkFQaDtfQbHV2i7ny8A3D10jv3P8MLcwLbEiY", 
  },
  icons: {
    icon: "./favicon.ico",
    apple: "https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729344482/protfolio/ewnsnr13wxpa8ethsaod.jpg",
  },
  openGraph: {
    title: "Alan Nixon - Software Engineer & MERN Freelancer",
    description: "Explore Alan Nixon's portfolio – a highly skilled Full Stack Developer and MERN expert, building scalable web applications using React, Node.js, Express, and MongoDB.",
    url: "https://alan-nixon.vercel.app",
    siteName: "Alan Nixon Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729344482/protfolio/ewnsnr13wxpa8ethsaod.jpg",
        width: 1200,
        height: 630,
        alt: "Alan Nixon Portfolio Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan Nixon - Software Engineer & MERN Freelancer",
    description: "Explore Alan Nixon's portfolio – a highly skilled Full Stack Developer and MERN expert, building scalable web applications using React, Node.js, Express, and MongoDB.",
    images: ["https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729344482/protfolio/ewnsnr13wxpa8ethsaod.jpg"],
  },
};



export default function RootLayout({ children }: layoutProps) {
  return ( 
    <html lang="en">
       
      <body
        className={`${inter.className} bg-white text-gray-900 min-h-screen flex flex-col`}
      >
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
