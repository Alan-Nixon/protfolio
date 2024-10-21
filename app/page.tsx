"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Chatbot from "./(componenets)/Chatbot";
import OpenSourceContribution from "./(componenets)/OpenSourceContribution";
import IntegratedApi from "./(componenets)/IntegratedApi";
import Education from "./(componenets)/Education";
import Experience from "./(componenets)/Experience";
import Skills from "./(componenets)/Skills";
import { MainProject, MiniProject } from "./(componenets)/Projects";
import { textBio, useUser } from "./(utils)/customHooks";
import LoadingPage from "./(componenets)/LoadinPage";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();

  if(!user.name) { return <LoadingPage /> }

  return (
    <div className="container mx-auto px-4 relative">
      <ProfileSection />
      <MainProject />
      <MiniProject />
      <Skills />
      <Experience />
      <OpenSourceContribution />
      <IntegratedApi />
      <Education />
      <Chatbot />
    </div>
  );
}

function ProfileSection() {
  const { user } = useUser();
  const [text,setText] = useState("");
  
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < textBio.length) {
        setText(prev => prev + ' ' + (textBio[currentIndex] || ""));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); 

    return () => clearInterval(intervalId); 
  }, []);


  if(!user.name) { return <LoadingPage /> }

  return (
    <section className="py-20 text-center">
      <div className="mb-8">
        <div className="w-56 h-56 mx-auto rounded-full overflow-hidden">
          {user.profileImage && (
            <Image
              src={user.profileImage}
              alt="Your Name"
              width={250}
              height={192}
              className="object-cover"
            />
          )}
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-4 reveal">
        Hi, I&apos;m <span className="text-emerald-700">{user.name}</span>
      </h1>
      <p className="text-xl mb-8 text-gray-600 reveal">{user.bio}</p>
      <Link
        href="/contact"
        className="bg-emerald-700 reveal text-white px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors inline-flex items-center"
      >
        Get in touch <ArrowRight className="ml-2" />
      </Link>
      <div className="mt-12 max-w-2xl mx-auto">
        <p className="text-gray-700 leading-relaxed reveal animate-fade-in">
          {text}
        </p>
      </div>
    </section>
  );
}
