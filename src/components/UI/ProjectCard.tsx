"use client";

import React, { useState } from "react";
import SpotlightCard from "./SpotLightCard";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  projectUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  image,
  projectUrl,
  githubUrl,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <SpotlightCard className="h-full">
      <div className="flex flex-col h-full">
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-white/5">
          {!imageError ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
              quality={80}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-white/50">
              <p className="text-sm">{title}</p>
            </div>
          )}
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        
        <p className="mb-4 text-sm text-gray-400">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs text-white rounded-full bg-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3 mt-auto">
          <motion.a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium transition-colors rounded-lg highlight bg-white/10 hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${title} project demo`}
          >
            View Project
          </motion.a>
          
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium transition-colors border rounded-lg text-white/80 border-white/20 hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${title} GitHub repository`}
          >
            GitHub Repo
          </motion.a>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ProjectCard; 