import "./globals.css";
import '../mongodbConnect/database'
import { Inter } from "next/font/google";
import { layoutProps } from "../interfaces_types/interfaces_types";
import ClientWrapper from "./ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alan Nixon",
  description: "Showcase of my work and skills as a developer",
  icons: {
    icon: "/path-to-your-image/favicon.ico", // Favicon
    apple: "/path-to-your-image/apple-touch-icon.png", // Apple touch icon
  },
  openGraph: {
    title: "Alan Nixon - Developer Portfolio",
    description: "Showcase of my work and skills as a developer",
    url: "https://yourwebsite.com",
    siteName: "Alan Nixon Portfolio",
    images: [
      {
        url: "https://yourwebsite.com/path-to-image.jpg", // OG Image URL
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
    title: "Alan Nixon - Developer Portfolio",
    description: "Showcase of my work and skills as a developer",
    images: ["https://yourwebsite.com/path-to-image.jpg"], // Twitter image
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
