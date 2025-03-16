"use client";

import { IDocumentation } from "@/interfaces_types/interfaces_types";
import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getDocument } from "../admin/(functions)/functions";

export default function DocumentationPage() {
  const [documentations, setDocumentations] = useState<IDocumentation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocument().then(({ data }) => {
      console.log(data);
      setDocumentations(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative w-full h-[250px] mb-12 rounded-xl overflow-hidden">
          <Image
            src="https://imgs.search.brave.com/ZJsFLexvJdXSOM7TVjS1r9QA7eBjARqIHnKmbvnHjps/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzUyLzYxLzk2/LzM2MF9GXzI1MjYx/OTYwM19KVmZaUnlp/bnBSR0VDWllFWG05/c3JJUHVzVDZPRTho/Ty5qcGc"
            alt="Technical documentation and resources"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Documentation & Resources
              </h1>
              <p className="max-w-2xl mx-auto text-gray-200">
                Explore my collection of technical guides, tutorials, and
                resources to help you build better web applications.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full py-3 pl-12 pr-4 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>
        {loading ? (
          <>loading..</>
        ) : (
          <div className="space-y-6">
            {documentations.map((doc, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <a href={doc.url} className="flex flex-col md:flex-row">
                  <div className="flex-grow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                      {doc.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {doc.description}
                    </p>
                    <div className="flex items-center text-emerald-600 font-medium">
                      Read more <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                  <div className="relative w-full md:w-48 h-32 md:h-auto">
                    <Image
                      src={(doc.image as string) || "/placeholder.svg"}
                      alt={doc.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
