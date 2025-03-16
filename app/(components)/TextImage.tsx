import { ITextSection } from "@/interfaces_types/interfaces_types";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";


export function TextImageSection({ data }: { data: ITextSection }) {
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
              href={data.buttonLink}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 
                         text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {data.buttonText} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={data.imageSrc || "/placeholder.svg"}
                alt={data.title}
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
