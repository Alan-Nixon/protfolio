'use client'

import { motion } from "framer-motion"
import { FileText, Clock, Briefcase, Palette, Code, Network, Users, CheckCircle, Star, Award } from 'lucide-react'
import Image from 'next/image'

const services = [
  {
    icon: FileText,
    title: "Web Development",
    description: "Full-stack web development services using modern technologies like React, Next.js, and Node.js. From simple landing pages to complex web applications, I deliver scalable and performant solutions.",
  },
  {
    icon: Clock,
    title: "API Integration",
    description: "Seamless integration of third-party APIs and development of custom APIs to enhance your application's functionality and create powerful, connected experiences.",
  },
  {
    icon: Briefcase,
    title: "E-commerce Solutions",
    description: "Build and maintain e-commerce platforms with secure payment integration, inventory management, and user-friendly interfaces to help your business thrive online.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Create intuitive and visually appealing user interfaces with a focus on user experience. Implement responsive designs that work flawlessly across all devices.",
  },
  {
    icon: Code,
    title: "Custom Development",
    description: "Tailored software solutions to meet your specific business needs. From automation tools to specialized applications, I turn your ideas into reality.",
  },
  {
    icon: Network,
    title: "Technical Consultation",
    description: "Expert advice on technology stack selection, architecture planning, and best practices to ensure your project's success from start to finish.",
  },
]

const stats = [
  {
    icon: Users,
    value: "0",
    label: "Happy Clients",
  },
  {
    icon: CheckCircle,
    value: "12+",
    label: "Projects Completed",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Client Satisfaction",
  },
  {
    icon: Award,
    value: "2+",
    label: "Years Experience",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Image Section */}
      <div className="relative w-full h-[400px]">
        <Image 
          src="https://imgs.search.brave.com/ZJsFLexvJdXSOM7TVjS1r9QA7eBjARqIHnKmbvnHjps/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzUyLzYxLzk2/LzM2MF9GXzI1MjYx/OTYwM19KVmZaUnlp/bnBSR0VDWllFWG05/c3JJUHVzVDZPRTho/Ty5qcGc" 
          alt="Professional web development services" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Services Heading Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Services
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to my comprehensive suite of web development and digital solutions. 
              As a passionate developer, I specialize in creating robust, scalable, and 
              user-centric applications that drive business growth.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              From concept to deployment, I offer end-to-end services that encompass modern 
              web technologies, responsive design, and seamless functionality. My approach 
              combines technical expertise with creative problem-solving.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're starting from scratch or upgrading existing systems, 
              I'm here to ensure your digital success with tailored solutions that 
              evolve with your business needs.
            </p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-center mb-3">
                <stat.icon className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="p-8">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help bring your ideas to life. I'm committed to delivering
            high-quality solutions that meet your specific needs.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}