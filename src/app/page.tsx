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
import { useUser } from "./(utils)/customHooks";

export default function Home() {
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
  return (
    <section className="py-20 text-center">
      <div className="mb-8">
        <div className="w-56 h-56 mx-auto rounded-full overflow-hidden">
          {user.profileImage && (
            <Image
              src={
                "https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729070240/WhatsApp_Image_2024-10-16_at_2.34.28_PM_scrhai.jpg" +
                  "" || user.profileImage
              }
              alt="Your Name"
              width={250}
              height={192}
              className="object-cover"
            />
          )}
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-4">
        Hi, I&apos;m <span className="text-emerald-700">{user.name}</span>
      </h1>
      <p className="text-xl mb-8 text-gray-600">{user.bio}</p>
      <Link
        href="/contact"
        className="bg-emerald-700 text-white px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors inline-flex items-center"
      >
        Get in touch <ArrowRight className="ml-2" />
      </Link>
      <div className="mt-12 max-w-2xl mx-auto">
        <p className="text-gray-700 leading-relaxed">
          Welcome to my portfolio! I&apos;m a dedicated full-stack developer
          with a passion for creating innovative and efficient solutions. With
          years of experience in both front-end and back-end technologies, I
          strive to build seamless, user-friendly applications that make a
          difference. My journey in tech has been driven by curiosity and a
          constant desire to learn and grow. I&apos;m excited to share my work
          with you and potentially collaborate on future projects!
        </p>
      </div>
    </section>
  );
}
