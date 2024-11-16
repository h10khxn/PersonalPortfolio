import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Calendar, ArrowLeft } from 'lucide-react';

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
  },
  {
    id: 5,
    title: "AI Controlled 2D Car Racing Game",
    description: "Trained an AI model to play my old 2D car racing game using Reinforcement Learning with PPO algorithms.",
    tech: ["Python", "Pygame", "NumPy", "Gym", "Stable Baseline3"],
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=800",
    demo: "https://example.com/demo-ai-car-racing",
    github: "",
    date: "2024"
  },
];

const ProjectCard = ({ project, index, currentIndex, totalProjects, onClick }: { 
  project: Project;
  index: number;
  currentIndex: number;
  totalProjects: number;
  onClick: () => void;
}) => {
  const calculatePosition = (idx: number, current: number, total: number) => {
    const diff = idx - current;
    if (diff === 0) return 0;
    if (diff > total / 2) return diff - total;
    if (diff < -total / 2) return diff + total;
    return diff;
  };

  const position = calculatePosition(index, currentIndex, totalProjects);
  const isActive = position === 0;
  const xOffset = position * 60;
  const scale = 1 - Math.abs(position) * 0.2;
  const opacity = 1 - Math.abs(position) * 0.3;
  const zIndex = isActive ? 1 : 0;

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex }}
      initial={false}
      animate={{
        x: `${xOffset}%`,
        scale,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div
        className="w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-800/50 backdrop-blur-xl group"
        onClick={onClick}
        whileHover={isActive ? { scale: 1.02 } : {}}
      >
        <div className="relative h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300">
            <div className="flex items-center gap-2 text-violet-300 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{project.date}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-300 mb-4 line-clamp-2 group-hover:text-white transition-colors">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-violet-500/20 text-violet-300 backdrop-blur-sm border border-violet-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.tech.length > 3 && (
                <motion.span
                  className="px-3 py-1 text-sm rounded-full bg-violet-500/20 text-violet-300 backdrop-blur-sm border border-violet-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  +{project.tech.length - 3}
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const NavigationButton = ({ direction, onClick }: { 
  direction: 'left' | 'right';
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg ${
      direction === 'left' ? '-left-4 lg:left-4' : '-right-4 lg:right-4'
    }`}
    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
    whileTap={{ scale: 0.95 }}
  >
    {direction === 'left' ? (
      <ChevronLeft className="w-6 h-6" />
    ) : (
      <ChevronRight className="w-6 h-6" />
    )}
  </motion.button>
);

export default function ProjectsAndDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [autoAdvance, setAutoAdvance] = useState(true);

  useEffect(() => {
    if (id) {
      const selectedProject = projects.find((p) => p.id.toString() === id);
      setProject(selectedProject);
      setAutoAdvance(false);
    } else {
      setProject(undefined);
      setAutoAdvance(true);
    }
  }, [id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoAdvance && !project) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 5000); // Adjusted to 5 seconds for a longer delay
    }
    return () => clearInterval(timer);
  }, [autoAdvance, project]);

  const handleNavigation = (direction: 'next' | 'prev') => {
    setAutoAdvance(false);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % projects.length
      : (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
  };

  if (!project) {
    return (
      <motion.section 
        className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-gray-900 to-black py-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.h2 
            className="text-5xl font-bold text-white mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-200"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.p
            className="text-violet-300/80 text-center mb-16 max-w-2xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore my latest work and personal projects
          </motion.p>

          <div className="relative h-[600px]">
            <NavigationButton direction="left" onClick={() => handleNavigation('prev')} />
            <NavigationButton direction="right" onClick={() => handleNavigation('next')} />

            <div className="relative w-full max-w-4xl mx-auto h-full">
              <AnimatePresence mode="wait">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    currentIndex={currentIndex}
                    totalProjects={projects.length}
                    onClick={() => navigate(`/project/${project.id}`)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-gray-900 to-black py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-violet-300 mb-8 group"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="group-hover:underline">Back to Projects</span>
        </motion.button>

        <motion.div
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative aspect-video group">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-2 text-violet-300 mb-4">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{project.date}</span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-200">
              {project.title}
            </h2>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 text-sm bg-violet-500/20 text-violet-300 rounded-full backdrop-blur-sm border border-violet-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            <div className="flex gap-4">
              <motion.a 
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-violet-500 text-white rounded-lg group overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                <span className="font-medium">View Demo</span>
              </motion.a>
              {project.github && (
                <motion.a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg group overflow-hidden relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  <span className="font-medium">View Code</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
