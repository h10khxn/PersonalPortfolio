import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  date: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Hospital Laboratory Database System",
    description: "Led development of a system to automate test ordering, result processing, and billing for hospital labs.",
    tech: ["PHP", "REST API","Fetch API", "MySQL", "HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    date: "2024",
  },
  {
    id: 2,
    title: "Mock Airport System",
    description: "Developed a robust mock airport management system in Java.",
    tech: ["Java", "OOP"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    date: "2023",
  },
  {
    id: 3,
    title: "2D Tower Defense Game",
    description: "Developed a Tower Defense game with HTML, CSS, and JavaScript, focusing on strategic gameplay, dynamic enemy waves, and resource management.",
    tech: ["HTML", "CSS", "JavaScript", "JSON"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    date: "2023",
  },
  {
    id: 4,
    title: "Pokémon Todo List",
    description: "Developed a visually engaging and interactive Pokémon-themed to-do list application.",
    tech: ["HTML", "CSS", "JavaScript", "UML"],
    image: "https://images.unsplash.com/photo-1542779283-429940ce8336?auto=format&fit=crop&q=80&w=800",
    date: "2023",
  },
  {
    id: 5,
    title: "AI Controlled 2D Car Racing Game",
    description: "Trained an AI model to play my old 2D car racing game using Reinforcement Learning with PPO algorithms.",
    tech: ["Python", "Pygame", "NumPy", "Gym", "Stable Baseline3"],
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=800",
    date: "2024",
  },
  {
    id: 6,
    title: "Weather App",
    description: "Developed a weather app that displays the current weather and forecast for any location around the world. Favorited cities displayed on main page.",
    tech: ["React", "TypeScript", "Tanstack Query", " Tailwind CSS", "OpenWeatherMap Rest API"],
    image: '/SKYCAST.PNG',
    date: '2024'
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
    {direction === 'left' ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
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
      setAutoAdvance(false);  // Stop auto-advance when viewing specific project
    } else {
      setProject(undefined);
      setAutoAdvance(true);  // Enable auto-advance when no specific project is selected
    }
  }, [id]);

  // Auto-advance timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoAdvance && !project) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 5000);  // Adjusted to 5 seconds for a longer delay
    }
    return () => clearInterval(timer); // Cleanup the timer
  }, [autoAdvance, project]);

  // Handle manual navigation via arrow buttons
  const handleNavigation = (direction: 'next' | 'prev') => {
    setAutoAdvance(false);  // Stop auto-advance
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % projects.length
      : (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
  };

  // Reset auto-advance after manual navigation
  useEffect(() => {
    if (!autoAdvance) {
      const timer = setTimeout(() => {
        setAutoAdvance(true);  // Re-enable auto-advance after a delay
      }, 3000);  // 3 seconds delay before resuming auto-advance

      return () => clearTimeout(timer);  // Cleanup if the component re-renders
    }
  }, [autoAdvance]);

  if (!project) {
    return (
      <motion.section
        className="min-h-screen bg-black py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto relative">
          <motion.h2 className="text-5xl font-bold text-white mb-4 text-center">
            Featured Projects
          </motion.h2>

          <div className="relative h-[600px]">
            <NavigationButton direction="left" onClick={() => handleNavigation('prev')} />
            <NavigationButton direction="right" onClick={() => handleNavigation('next')} />

            <div className="relative w-full max-w-4xl mx-auto h-full">
              <AnimatePresence>
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
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
