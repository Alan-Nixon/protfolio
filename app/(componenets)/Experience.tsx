"use client";

import { useEffect, useState } from "react";
import { IExperience } from "../../interfaces_types/interfaces_types";
import { getExperience } from "@/app/(utils)/functions";

export default function Experience() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);

  useEffect(() => {
    getExperience().then(({ data }) => setExperiences(data));
  }, []);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
            <p className="text-gray-600">{exp.companyName}</p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              {exp.roles.map((role, roleIndex) => (
                <li key={roleIndex}>{role}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="bg-emerald-100 p-6 rounded-lg shadow-md border border-emerald-200 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2 text-emerald-800">
            Key Achievements
          </h3>
          <ul className="list-disc list-inside text-emerald-700">
            {experiences.length > 0 &&
              experiences[0].achievements.map(
                (achievement, achievementIndex) => (
                  <li key={achievementIndex}>{achievement}</li>
                )
              )}
          </ul>
        </div>
      </div>
    </section>
  );
}
