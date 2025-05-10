"use client";

import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  projectUrl: string;
  githubUrl: string;
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "E-Commerce App",
    description: "A modern, full-featured e-commerce storefront built with Next.js, TypeScript, Tailwind CSS, and Shopify. Ideal for forward-thinking businesses seeking a scalable, performant, and customizable online shopping experience.",
    technologies: ["Next.js", "TypeScript","React", "TailwindCSS", "Framer Motion", "GraphQL", "shopify"],
    image: "/images/protoShop.png",
    projectUrl: "https://protoshop-dev.vercel.app/",
    githubUrl: "https://github.com/MohannadDev/protoshop-dev",
  },
  {
    id: 2,
    title: "Space tourism",
    description: " A multi-page responsive website showcasing destinations, crew, and technology for a fictional space tourism company, built with clean design and smooth navigation.",
    technologies: ["React", "TypeScript", "CSS"],
    image: "/images/space_tourism.jpeg",
    projectUrl: "https://mohannaddev.github.io/space-tourism/",
    githubUrl: "https://github.com/MohannadDev/space-tourism",
  },
  {
    id: 3,
    title: "Time Tracking Dashboard",
    description: "A collaborative task management application with real-time updates, customizable workflows, and team collaboration features.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    image: "/images/time_tracking.jpg",
    projectUrl: "https://mohannaddev.github.io/time-tracking-dashboard/",
    githubUrl: "https://github.com/MohannadDev/time-tracking-dashboard",
  }
];

interface ProjectsProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function Projects({ limit, showViewAll = true }: ProjectsProps) {
  const displayedProjects = limit ? projectsData.slice(0, limit) : projectsData;

  return (
    <section id="Projects" className="relative z-20 py-20 pb-24 text-white bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="highlight">Featured</span> Projects
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Explore some of my recent work showcasing my skills and expertise
            in web development.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:max-w-3xl lg:max-w-none">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="md:mx-auto md:w-full"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  image={project.image}
                  projectUrl={project.projectUrl}
                  githubUrl={project.githubUrl}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {showViewAll && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
           
              <motion.a
                className="px-6 py-3 font-medium text-white transition-colors border rounded-lg border-white/20 hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/MohannadDev"
                aria-label="View all projects on GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                View All Projects
              </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
} 