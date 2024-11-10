import React from 'react';
import { motion } from 'framer-motion';

interface Technology {
  name: string;
  color: string;
}

interface ProjectProps {
  title: string;
  description: string;
  technologies: Technology[];
  image: string;
}

export default function ProjectCard({ title, description, technologies, image }: ProjectProps) {
  return (
    <motion.div
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl w-[80%] max-w-[450px] mx-auto cursor-pointer"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <motion.div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-lg font-semibold">Click for details</p>
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <motion.span
              key={index}
              className={`px-3 py-1 text-sm rounded-full ${tech.color}`}
              whileHover={{ scale: 1.1 }}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
