import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  demo: string;
  github: string;
  date: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Hospital Laboratory System",
    description: "Led development of a system to automate test ordering, result processing, and billing for hospital labs.",
    tech: ["Java", "REST API", "MySQL", "HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    demo: "https://example.com/demo-hospital-lab",
    github: "https://github.com/example/hospital-lab",
    date: "2023",
  },
  {
    id: 2,
    title: "Mock Airport System",
    description: "Developed a robust mock airport management system in Java.",
    tech: ["Java", "OOP"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    demo: "https://example.com/demo-airport-system",
    github: "https://github.com/example/airport-system",
    date: "2023",
  },
  {
    id: 3,
    title: "2D Tower Defense Game",
    description: "Utilized agile development methodologies to iterate on a game.",
    tech: ["HTML", "CSS", "JavaScript", "JSON"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    demo: "https://example.com/demo-tower-defense",
    github: "https://github.com/example/tower-defense",
    date: "2022",
  },
  {
    id: 4,
    title: "Pokémon Todo List",
    description: "Developed a visually engaging and interactive Pokémon-themed to-do list application.",
    tech: ["HTML", "CSS", "JavaScript", "UML"],
    image: "https://images.unsplash.com/photo-1542779283-429940ce8336?auto=format&fit=crop&q=80&w=800",
    demo: "https://example.com/demo-pokemon-todo",
    github: "https://github.com/example/pokemon-todo",
    date: "2022",
  }
];

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Projects component rendered'); // Debugging log

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextProject = (): void => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = (): void => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProjectDetails = (id: number): void => {
    navigate(`/project/${id}`);
  };

  if (!projects || projects.length === 0) {
    return <div className="text-white">No projects available.</div>;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.h2 
          className="text-4xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <div className="relative flex justify-center items-center">
          <button
            onClick={prevProject}
            className="absolute left-10 p-3 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition-colors z-10 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="w-full max-w-4xl flex justify-center overflow-hidden">
            <ProjectCard 
              title={projects[currentIndex].title}
              description={projects[currentIndex].description}
              technologies={projects[currentIndex].tech.map((tech) => ({ name: tech, color: "bg-violet-500/10 text-violet-300" }))}
              image={projects[currentIndex].image}
            />
          </div>

          <button
            onClick={nextProject}
            className="absolute right-10 p-3 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition-colors z-10 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
