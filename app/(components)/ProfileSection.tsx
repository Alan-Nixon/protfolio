import { IUser } from "@/interfaces_types/interfaces_types";
import { textBio } from "../(utils)/customHooks";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function ProfileSection({ user }: { user: IUser }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < textBio.length) {
        setText((prev) => prev + " " + (textBio[currentIndex] || ""));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 90);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-8 text-center">
      <div className="bg-gray-100 p-10">
        <div className="mb-8">
          <div className="w-56 h-56 mx-auto rounded-full overflow-hidden">
            {user.profileImage && (
              <Image
                src={user.profileImage || "/placeholder.svg"}
                alt="Your Name"
                width={250}
                height={192}
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 reveal">
          Hi, I&apos;m <span className="text-emerald-700">{user.name}</span>
        </h1>
        <p className="text-xl mb-8 text-gray-600 reveal">{user.bio}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8">
          <Link
            href="../alan_nixon_resume.pdf"
            className=" w-full sm:w-auto bg-cyan-700 reveal text-white px-6 py-3 rounded-full hover:bg-cyan-800 transition-colors flex items-center justify-center"
          >
            Download Resume <Download className="ml-2" />
          </Link>

          <Link
            href="/contact"
            className=" w-full sm:w-auto bg-emerald-700 reveal text-white px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors flex items-center justify-center"
          >
            Get in touch <ArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <p className="text-gray-700 leading-relaxed reveal animate-fade-in">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
