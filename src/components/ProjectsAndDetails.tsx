import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowLeft, Globe, Github, Briefcase } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  date: string;
  links?: {
    live?: string;
    github?: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Hospital Laboratory Database System",
    description: "Led development of a system to automate test ordering, result processing, and billing for a hospital labratory.",
    tech: ["PHP", "REST API","Fetch API", "MySQL", "HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    date: "2024",
  },
  {
    id: 2,
    title: "Mock Airport System",
    description: "Developed a robust mock airport management system using Java.",
    tech: ["Java", "OOP"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    date: "2023",
  },
  {
    id: 3,
    title: "2D Tower Defense Game",
    description: "Developed a Tower Defense game with HTML, CSS, and JavaScript, focusing on strategic gameplay, dynamic enemy waves, and resource management.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    date: "2023",
  },
  {
    id: 4,
    title: "Pokémon To-do List",
    description: "Developed a visually engaging and interactive Pokémon-themed to-do list application.",
    tech: ["HTML", "CSS", "JavaScript", "UML", "PHP", "MySQL", "React"],
    image: "https://images.unsplash.com/photo-1542779283-429940ce8336?auto=format&fit=crop&q=80&w=800",
    date: "2023",
  },
  {
    id: 5,
    title: "AI Controlled 2D Car Racing Game",
    description: "Developed and trained an AI model using Reinforcement Learning with a custom Deep Q- Neural Network to play and adaptively improve performance in my 2D car racing game.",
    tech: ["Python", "Pygame", "NumPy", "Gym", "Stable Baseline3"],
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=800",
    date: "2024",
  },
  {
    id: 6,
    title: "Weather App",
    description: "Developed a weather app that displays the current weather and forecast for any location around the world. Favorited cities displayed on main page. Used a Rest API to fetch weather data.",
    tech: ["React", "TypeScript", "Tanstack Query", "Tailwind CSS", "OpenWeatherMap Rest API"],
    image: '/SKYCAST.png',
    date: '2024',
    links: {
      live: "https://skycastweathernet.netlify.app/",
    }
  },
  {
    id: 7,
    title: "Ai Doctor",
    description: "Built an AI-powered symptom checker that predicts possible diseases based on user-selected symptoms. Trained a fine-tuned DistilBERT model on a symptom-disease dataset for accurate classification. Developed preprocessing, training, and inference pipeline from scratch.",
    tech: ["Python", "PyTorch", "Transformers (HuggingFace)", "Pandas", "scikit-learn", "Flask", "Hugging Face Datasets"],
    image: "/DoctorAi.jpg",
    date: '2025',
  },
];

// ─── Project Card ────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index, currentIndex, totalProjects, onClick }: {
  project: Project;
  index: number;
  currentIndex: number;
  totalProjects: number;
  onClick: () => void;
}) => {
  const diff = (() => {
    const d = index - currentIndex;
    if (d > totalProjects / 2) return d - totalProjects;
    if (d < -totalProjects / 2) return d + totalProjects;
    return d;
  })();

  const isActive = diff === 0;
  const xOffset = diff * 60;
  const scale = Math.max(0.4, 0.85 - Math.abs(diff) * 0.2);
  const opacity = Math.max(0, 1 - Math.abs(diff) * 0.35);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: isActive ? 10 : Math.max(0, 5 - Math.abs(diff)) }}
      initial={false}
      animate={{ x: `${xOffset}%`, scale, opacity }}
      transition={{ type: 'tween', duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="w-[85%] h-[85%] rounded-2xl overflow-hidden cursor-pointer bg-gray-800/50 backdrop-blur-xl group border border-white/8"
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
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
            <div className="flex items-center gap-2 text-teal-400 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm">{project.date}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors leading-tight">
              {project.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 group-hover:text-white transition-colors">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/20"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2.5 py-1 text-xs rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/20">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProjectsAndDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [autoAdvance, setAutoAdvance] = useState(true);

  useEffect(() => {
    if (id) {
      setProject(projects.find((p) => p.id.toString() === id));
      setAutoAdvance(false);
    } else {
      setProject(undefined);
      setAutoAdvance(true);
    }
  }, [id]);

  useEffect(() => {
    if (!autoAdvance || project) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoAdvance, project]);

  const go = (dir: 'next' | 'prev') => {
    setAutoAdvance(false);
    setCurrentIndex((prev) =>
      dir === 'next'
        ? (prev + 1) % projects.length
        : (prev - 1 + projects.length) % projects.length
    );
  };

  // ── Detail view ────────────────────────────────────────────────────────────
  if (project) {
    return (
      <motion.section
        className="min-h-screen overflow-y-auto bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-20">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-teal-400 mb-8 group"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="group-hover:underline text-sm">Back to Projects</span>
          </motion.button>

          <motion.div
            className="bg-gray-900/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative aspect-video group overflow-hidden rounded-t-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-teal-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{project.date}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 mb-4">
                {project.title}
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1 text-sm bg-teal-500/15 text-teal-300 rounded-full border border-teal-500/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {project.links && (
                <div className="flex gap-3 flex-wrap">
                  {project.links.live && (
                    <motion.a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-teal-500/15 text-teal-300 rounded-lg border border-teal-500/20 hover:bg-teal-500/25 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  )}
                  {project.links.github && (
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-teal-500/15 text-teal-300 rounded-lg border border-teal-500/20 hover:bg-teal-500/25 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </motion.a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  // ── Carousel view ──────────────────────────────────────────────────────────
  return (
    <motion.section
      className="relative overflow-hidden bg-black"
      style={{ background: 'linear-gradient(160deg, #050510 0%, #080820 50%, #050510 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Aurora orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none aurora-1"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[110px] pointer-events-none aurora-2"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)' }} />

      {/* Top / bottom fades */}
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto flex flex-col items-center">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Briefcase className="w-7 h-7 text-teal-400" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-500">
                PROJECTS
              </h2>
            </div>
            <div className="h-px w-24 mx-auto rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 mb-5" />
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              A selection of things I've built, Click any card to learn more
            </p>
          </motion.div>

          {/* ── Carousel ── */}
          {/*
            Arrows are INSIDE this container so top-1/2 is relative
            to the carousel box, not the full section.
          */}
          <div className="relative w-full" style={{ height: 'clamp(320px, 55vh, 520px)' }}>

            {/* Left arrow — outer div owns position, inner button owns animation */}
            <div className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30">
              <motion.button
                onClick={() => go('prev')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/40 transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>

            {/* Right arrow */}
            <div className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30">
              <motion.button
                onClick={() => go('next')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/40 transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>

            {/* Cards */}
            <AnimatePresence initial={false}>
              {projects.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  currentIndex={currentIndex}
                  totalProjects={projects.length}
                  onClick={() => navigate(`/project/${p.id}`)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Counter + dots */}
          <div className="flex flex-col items-center gap-2 mt-6">
            <span className="text-gray-600 text-xs font-mono tracking-widest">
              {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoAdvance(false); setCurrentIndex(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 bg-teal-400'
                      : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
