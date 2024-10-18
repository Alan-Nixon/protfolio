"use client";

import React, { useEffect, useState } from 'react';
import { IEducation } from '../interfaces_types/interfaces_types';



export default function Education() {
  const [educationData, setEducationData] = useState<IEducation[]>([]);

  useEffect(() => {
    const data: IEducation[] = [
      {
        Title: 'Bachelor of Science in Computer Science',
        institution: 'University Name',
        Year: 'Graduation Year',
        details: [
          'Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development',
          'Senior project: Developed a machine learning model for predicting stock prices',
          'GPA: 3.8/4.0',
        ],
      },
      {
        Title: 'Full-Stack Web Development Bootcamp',
        institution: 'Bootcamp Name',
        Year: 'Completion Year',
        details: [
          'Intensive 12-week program covering modern web development technologies',
          'Built 5 full-stack projects, including a social media application and an e-commerce platform',
          'Received award for "Most Innovative Project" in the final showcase',
        ],
      },
    ];

    setEducationData(data);
  }, []);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
      <div className="max-w-2xl mx-auto">
        {educationData.map((item, index) => (
          <div key={index} className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">{item.Title}</h3>
            <p className="text-gray-600 mb-4">{item.institution}, {item.Year}</p>
            <ul className="list-disc list-inside text-gray-600">
              {item.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
