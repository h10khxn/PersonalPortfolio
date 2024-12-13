import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Code2, Database, Cloud, Layout, Shield, Cpu, BrainCircuit } from 'lucide-react';

const skills = [
  {
    category: "Frontend Development",
    icon: Layout,
    items: ["HTML", "JavaScript", "TypeScript", "React.js", "Tailwind CSS"],
  },
  {
    category: "Backend Development",
    icon: Code2,
    items: ["Java", "Python", "API's", "PHP"],
  },
  {
    category: "Database Systems",
    icon: Database,
    items: ["MySQL", "SQL"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    items: ["CI/CD", "Docker", "Version Control (Git)"],
  },
  {
    category: "ML & Automation",
    icon: BrainCircuit,
    items: [
      "Python",
      "Data Structures And Algorithms",
      "Deep Learning",
      "APIs and Automation",
      "Object-Oriented Programming",
      "GUI Automation",
      "Web Scraping",
    ],
  },
  {
    category: "System Design",
    icon: Cpu,
    items: [
      "Microservices",
      "Scalability",
      "Performance",
      "Architecture",
      "Design Patterns",
      "Design Views",
      "Databases",
    ],
  },
];

// Fancy text animation for "What I Do"
const titleWords = "What I Do".split(" ");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const glowVariants = {
  initial: {
    opacity: 0,
    scale: 0.2,
  },
  animate: {
    opacity: [0, 0.5, 0], // Explicitly using keyframes
    scale: [0.2, 1.5], // Added keyframes for scale
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const, // Ensure this is correct
      ease: "easeInOut", // Add easing for smoother animation
    },
  },
};

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, []);

  return (
    <div>
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
                {/* Animated background particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-500 rounded-full"
            initial={{
              x: Math.random() * document.documentElement.clientWidth,
              y: Math.random() * document.documentElement.scrollHeight,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [Math.random() * document.documentElement.scrollHeight, -100],

              opacity: [0.5, 0],    // Animate opacity from visible to invisible
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}


        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto px-4 relative"
        >
          {/* Fancy animated title */}
          <div className="text-center mb-16 relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-3xl"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
            <div className="flex justify-center items-center gap-3">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: i * 0.2,
                    type: "spring",
                    stiffness: 100 
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                const isActive = activeSkill === index;

                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    className={`
                      p-6 rounded-xl relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-700' 
                        : 'bg-gradient-to-r from-gray-800 to-gray-900'
                      }
                      transition-all duration-300 shadow-xl
                      hover:shadow-2xl hover:shadow-violet-500/20
                    `}
                    onMouseEnter={() => {
                      setActiveSkill(index);
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setActiveSkill(null);
                      setIsHovered(false);
                    }}
                  >
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isHovered ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                          className="w-12 h-12 flex items-center justify-center rounded-full 
                            bg-gradient-to-br from-violet-500 to-purple-500 
                            shadow-lg shadow-violet-500/30"
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <motion.h3 
                          className="text-xl font-semibold text-white ml-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill.category}
                        </motion.h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {skill.items.map((item, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ 
                              scale: 1.1,
                              transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 10
                              }
                            }}
                            className={`
                              px-3 py-1 text-sm rounded-full cursor-pointer
                              ${hoveredTag === item
                                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white'
                                : 'bg-white/10 text-gray-300'
                              }
                              transition-all duration-200
                            `}
                            onHoverStart={() => setHoveredTag(item)}
                            onHoverEnd={() => setHoveredTag(null)}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-gradient-to-t from-black to-gray-900">
        {/* Bottom gradient section remains unchanged */}
      </section>
    </div>
  );
}