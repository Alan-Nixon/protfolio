"use client";

import { Book } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IIntegratedApi } from "../../interfaces_types/interfaces_types";
import { getIntegratedApiSchema } from "@/app/(utils)/functions";

export default function IntegratedApi() {
  const [api, setApi] = useState<IIntegratedApi[]>([]);
  useEffect(() => {
    getIntegratedApiSchema().then(({ data }) => setApi(data));
  }, []);
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Integrated APIs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {api.map((api) => (
          <div
            key={api._id}
            className="transition-transform duration-300 hover:scale-105 bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{api.Title} API</h3>
            <p className="text-gray-600">{api.Description}</p>
            <Link
              href={api.Docs}
              className="text-emerald-700 mt-1 hover:text-emerald-900 inline-flex items-center"
            >
              <Book className="mr-2" size={20} />
              View Doc
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
