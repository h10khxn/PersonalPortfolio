import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Code2, Database, Cloud, Layout, Cpu, BrainCircuit } from 'lucide-react';

const skills = [
  {
    category: "Frontend Development",
    icon: Layout,
    items: ["HTML", "JavaScript", "TypeScript", "React.js", "Tailwind CSS"],
  },
  {
    category: "Backend Development",
    icon: Code2,
    items: ["Java", "Python", "API's", "PHP", "Node.js"],
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

const titleVariants = {
  initial: {
    opacity: 0,
    y: '50vh',
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.15,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  moveUp: {
    y: '-2rem',
    scale: 0.9,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const skillsContainerVariants = {
  initial: { 
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const skillCardVariants = {
  initial: { 
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleControls = useAnimation();
  const skillsControls = useAnimation();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
    amount: 0.2,
  });

  useEffect(() => {
    const sequence = async () => {
      if (isInView) {
        await titleControls.start("animate");
        await titleControls.start("moveUp");
        await skillsControls.start("animate");
      }
    };
    sequence();
  }, [isInView, titleControls, skillsControls]);

  const titleWords = [
    { text: "EXPLORE", highlight: true },
    { text: "MY", highlight: false },
    { text: "TECHNICAL", highlight: true },
    { text: "SKILLS", highlight: false },
  ];

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 relative overflow-visible py-20 px-4"
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-purple-900/20"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Title Section */}
        <motion.div
          initial="initial"
          animate={titleControls}
          className="text-center mb-20"
        >
          <div className="flex flex-wrap justify-center items-baseline gap-x-3 gap-y-2">
            {titleWords.map(({ text, highlight }, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={titleVariants}
                className="overflow-hidden"
              >
                <motion.span 
                  className={`inline-block text-4xl sm:text-5xl md:text-6xl font-bold
                    ${highlight 
                      ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 text-transparent bg-clip-text'
                      : 'text-gray-200'
                    }`}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {text}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          variants={skillsContainerVariants}
          initial="initial"
          animate={skillsControls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                variants={skillCardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className={`
                  p-6 rounded-xl relative overflow-hidden backdrop-blur-lg
                  ${activeSkill === index 
                    ? 'bg-gradient-to-r from-violet-600/90 to-purple-700/90' 
                    : 'bg-gradient-to-r from-gray-800/80 to-gray-900/80'
                  }
                  transition-all duration-300 shadow-xl
                  hover:shadow-2xl hover:shadow-violet-500/20
                  touch-none
                `}
                onMouseEnter={() => setActiveSkill(index)}
                onMouseLeave={() => setActiveSkill(null)}
                onTouchStart={() => setActiveSkill(index)}
                onTouchEnd={() => setActiveSkill(null)}
              >
                {/* Card glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10"
                  animate={{
                    opacity: activeSkill === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 flex items-center justify-center rounded-full 
                        bg-gradient-to-br from-violet-500 to-purple-500 
                        shadow-lg shadow-violet-500/30"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white ml-4">
                      {skill.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {skill.items.map((item, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ 
                          scale: 1.05,
                        }}
                        className={`
                          px-3 py-1 text-sm rounded-full cursor-pointer select-none
                          ${hoveredTag === item
                            ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }
                          transition-all duration-200
                        `}
                        onMouseEnter={() => setHoveredTag(item)}
                        onMouseLeave={() => setHoveredTag(null)}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-500/50 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * 500,
          }}
          animate={{
            y: [Math.random() * 500, -50],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
    </div>
  );
}
