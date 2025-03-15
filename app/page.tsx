"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Chatbot from "./(components)/Chatbot";
import OpenSourceContribution from "./(components)/OpenSourceContribution";
import IntegratedApi from "./(components)/IntegratedApi";
import Education from "./(components)/Education";
import Experience from "./(components)/Experience";
import Skills from "./(components)/Skills";
import { MainProject, MiniProject } from "./(components)/Projects";
import { useUser } from "./(utils)/customHooks";
import LoadingPage from "./(components)/LoadingPage";
import ProfileSection from "./(components)/ProfileSection";

export default function Home() {
  const { user } = useUser();

  if (!user.name) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto px-4 relative">
      <ProfileSection user={user} />
      <MainProject />
      <ServicesHomeSection />
      <Skills />
      <IntegratedApi />
      <MiniProject />
      <Experience />
      <OpenSourceContribution />
      <Education />
      <Chatbot />
    </div>
  );
}



function ServicesHomeSection() {
  const data = {
    title: "My Services",
    description: `I have worked on multiple projects, including e-commerce platforms, streaming applications, and various utility-based web apps. My experience includes building scalable, responsive, and high-performance applications using modern JavaScript frameworks like React, Next.js, and Node.js. Along with development, I ensure best practices in optimization, security, and maintainability, making sure your project runs smoothly. Whether you need a website from scratch or technical support, I’ve got you covered. Let’s connect and bring your ideas to life! `,
    imageSrc:
      "https://imgs.search.brave.com/HrcCdVa7Mofjc00YBM4pGWAnTlGr5fQQShUsD-JMWec/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by93ZWItZGVzaWdu/LWNvbmNlcHQtaW50/ZXJuZXQtcGFnZXMt/bGFwdG9wLWJhY2tn/cm91bmRfMTAyNTgz/LTU1NTIuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZA",
    imageAlt: "Section image",
  };

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {data.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {data.description}
            </p>

            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 
                       text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Go to Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={data.imageSrc || "/placeholder.svg"}
                alt={data.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
