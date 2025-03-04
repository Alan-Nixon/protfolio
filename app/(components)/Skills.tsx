"use client";
import { Code, Database, Server, Cable } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ISkill } from "../../interfaces_types/interfaces_types";
import { getSkills } from "@/app/(utils)/functions";

const iconLibrary = {
  Code: <Code size={48} className="mx-auto mb-4 text-emerald-700" />,
  Database: <Database size={48} className="mx-auto mb-4 text-emerald-700" />,
  Server: <Server size={48} className="mx-auto mb-4 text-emerald-700" />,
  Cable: <Cable size={48} className="mx-auto mb-4 text-emerald-700" />,
};

export default function Skills() {
  const [skills, setSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    getSkills().then(({ data }) => setSkills(data));
  }, []);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {skills.map((Item) => {
          return (
            <div
              key={Item._id}
              className="transition-transform duration-300 hover:scale-105 p-6 ml-2 bg-white rounded-lg shadow-md border border-gray-200"
            >
              {iconLibrary[Item.icon as keyof typeof iconLibrary]}
              <h3 className="text-xl font-semibold mb-2">{Item.title}</h3>
              <p className="text-gray-600">{Item.skill}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
