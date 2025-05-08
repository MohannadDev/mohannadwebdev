'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/UI/AnimatedText';
import Link from 'next/link';

// Sample project data
const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Website',
    description: 'A full-featured e-commerce platform built with Next.js, Tailwind CSS, and Stripe for payments.',
    image: '/placeholder.jpg',
    tags: ['Next.js', 'Tailwind CSS', 'Stripe', 'MongoDB'],
    link: 'https://github.com',
    demo: 'https://example.com',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A task management application with drag-and-drop functionality and user authentication.',
    image: '/placeholder.jpg',
    tags: ['React', 'Firebase', 'Framer Motion', 'CSS'],
    link: 'https://github.com',
    demo: 'https://example.com',
    featured: true
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current conditions and forecasts based on location.',
    image: '/placeholder.jpg',
    tags: ['JavaScript', 'React', 'Weather API', 'CSS'],
    link: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    id: 4,
    title: 'Social Media App',
    description: 'A social media application with real-time messaging and post creation.',
    image: '/placeholder.jpg',
    tags: ['Next.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
    link: 'https://github.com',
    demo: 'https://example.com'
  },
];

// Project card component
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="overflow-hidden bg-white shadow-lg dark:bg-gray-800 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
        {/* Replace with actual image when available */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
          Project Image Placeholder
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Code
          </Link>
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Live Demo
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Featured project card component
const FeaturedProjectCard = ({ project }) => {
  return (
    <motion.div
      className="relative col-span-1 overflow-hidden bg-white shadow-lg md:col-span-2 dark:bg-gray-800 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:grid md:grid-cols-2">
        <div className="relative h-48 bg-gray-200 md:h-full dark:bg-gray-700">
          {/* Replace with actual image when available */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Project Image Placeholder
          </div>
        </div>
        <div className="p-6">
          <div className="mb-2">
            <span className="px-2 py-1 text-xs text-white bg-blue-600 rounded">Featured</span>
          </div>
          <h3 className="mb-2 text-2xl font-bold">{project.title}</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Code
            </Link>
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Live Demo
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [filter, setFilter] = useState('all');
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.tags.includes(filter));
  
  // Extract unique tags for the filter
  const allTags = [...new Set(projectsData.flatMap(project => project.tags))];

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <AnimatedText 
          text="My Projects" 
          className="mb-16 text-4xl font-bold text-center md:text-6xl" 
        />
        
        {/* Filter controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Featured projects */}
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2">
          {filteredProjects
            .filter(project => project.featured)
            .map(project => (
              <FeaturedProjectCard key={project.id} project={project} />
            ))}
        </div>
        
        {/* Regular projects */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects
            .filter(project => !project.featured)
            .map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>
    </div>
  );
} 