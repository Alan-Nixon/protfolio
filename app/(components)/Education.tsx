"use client";

import React, { useEffect, useState } from "react";
import { IEducation } from "../../interfaces_types/interfaces_types";
import { getEducation } from "@/app/(utils)/functions";
import { CircleLoader } from "./LoadingPage";

export default function Education() {
  const [educationData, setEducationData] = useState<IEducation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEducation().then(({ data }) => {
      setLoading(false);
      setEducationData(data);
    });
  }, []);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
      {loading ? (
        <CircleLoader />
      ) : (
        <div className="max-w-2xl mx-auto">
          {educationData.map((item, index) => (
            <div
              key={index}
              className="transition-transform duration-300 hover:scale-105 mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{item.Title}</h3>
              <p className="text-gray-600 mb-4">
                {item.institution}, {item.Year}
              </p>
              <ul className="list-disc list-inside text-gray-600">
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
