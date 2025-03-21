"use client";
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
import { TextImageSection } from "./(components)/TextImage";

const dataServices = {
  title: "My Services",
  description: `I have worked on multiple projects, including e-commerce platforms, streaming applications, and various utility-based web apps. My experience includes building scalable and responsive. Along with development, I ensure best practices in optimization, security, and maintainability, making sure your project runs smoothly. Whether you need a website from scratch or technical support, I’ve got you covered. Let’s connect and bring your ideas to life! `,
  imageSrc:
    "https://imgs.search.brave.com/HrcCdVa7Mofjc00YBM4pGWAnTlGr5fQQShUsD-JMWec/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by93ZWItZGVzaWdu/LWNvbmNlcHQtaW50/ZXJuZXQtcGFnZXMt/bGFwdG9wLWJhY2tn/cm91bmRfMTAyNTgz/LTU1NTIuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZA",
  buttonLink: "/services",
  buttonText: "Go to Services",
};

const dataProjects = {
  title: "Projects",
  description:
    "Working on projects helps tackle real-world challenges, improving problem-solving skills and critical thinking. By breaking down complex problems into manageable tasks, you gain a deeper understanding of various technologies and stacks. Each project enhances your ability to debug, optimize performance, and adapt to new tools, making you more efficient and versatile as a developer.",
  imageSrc: "/bg-product.webp",
  buttonLink: "/projects",
  buttonText: "Go to Projects",
};

export default function Home() {
  const { user } = useUser();

  if (!user.name) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto px-4 relative">
      <ProfileSection user={user} />
      <Skills />
      <TextImageSection data={dataServices} />
      <IntegratedApi />
      <TextImageSection data={dataProjects} />
      <MainProject />
      <MiniProject />
      <Experience />
      <OpenSourceContribution />
      <Education />
      <Chatbot />
    </div>
  );
}
