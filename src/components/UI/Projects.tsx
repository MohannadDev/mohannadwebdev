"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

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
    description:
      "A modern, full-featured e-commerce storefront built with Next.js, TypeScript, Tailwind CSS, and Shopify. Ideal for forward-thinking businesses seeking a scalable, performant, and customizable online shopping experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Framer Motion",
      "GraphQL",
      "shopify",
    ],
    image: "/images/protoShop.png",
    projectUrl: "https://protoshop-dev.vercel.app/",
    githubUrl: "https://github.com/MohannadDev/protoshop-dev",
  },
  {
    id: 2,
    title: "Space tourism",
    description:
      " A multi-page responsive website showcasing destinations, crew, and technology for a fictional space tourism company, built with clean design and smooth navigation.",
    technologies: ["React", "TypeScript", "CSS"],
    image: "/images/space_tourism.jpeg",
    projectUrl: "https://mohannaddev.github.io/space-tourism/",
    githubUrl: "https://github.com/MohannadDev/space-tourism",
  },
  {
    id: 3,
    title: "Time Tracking Dashboard",
    description:
      "A collaborative task management application with real-time updates, customizable workflows, and team collaboration features.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    image: "/images/time_tracking.jpg",
    projectUrl: "https://mohannaddev.github.io/time-tracking-dashboard/",
    githubUrl: "https://github.com/MohannadDev/time-tracking-dashboard",
  },
];

interface ProjectsProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function Projects({ limit, showViewAll = true }: ProjectsProps) {
  const displayedProjects = limit ? projectsData.slice(0, limit) : projectsData;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-heading",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-heading",
            start: "top bottom",
            end: "bottom 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".project-card",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          stagger: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
            end: "top center",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".view-all-button",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".view-all-button",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative py-20 pb-24 text-white bg-black z-1"
      id="Projects"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <div className="mb-16 text-center projects-heading">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="highlight">Featured</span> Projects
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Explore some of my recent work showcasing my skills and expertise in
            web development.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 projects-grid">
          {displayedProjects.map((project) => (
            <div key={project.id} className="project-card">
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                projectUrl={project.projectUrl}
                githubUrl={project.githubUrl}
              />
            </div>
          ))}
        </div>

        {showViewAll && (
          <div className="flex justify-center mt-12 view-all-button">
            <a
              className="px-6 py-3 font-medium text-white transition-colors border rounded-lg border-white/20 hover:bg-white/10 hover:scale-105 active:scale-95"
              href="https://github.com/MohannadDev"
            >
              View All Projects
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
