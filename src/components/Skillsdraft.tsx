import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { Code2, Database, Cloud, Layout, Cpu, BrainCircuit, Sparkles } from 'lucide-react';

const skills = [
  {
    category: "Frontend Development",
    icon: Layout,
    color: "from-blue-500 to-cyan-400",
    items: ["HTML", "JavaScript", "TypeScript", "React.js", "Tailwind CSS"],
    description: "Crafting responsive, interactive user experiences"
  },
  {
    category: "Backend Development", 
    icon: Code2,
    color: "from-violet-500 to-purple-400",
    items: ["Java", "Python", "API's", "PHP", "Node.js"],
    description: "Building robust, scalable server-side solutions"
  },
  {
    category: "Database Systems",
    icon: Database,
    color: "from-emerald-500 to-teal-400", 
    items: ["MySQL", "SQL"],
    description: "Designing efficient data storage and retrieval systems"
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    color: "from-orange-500 to-red-400",
    items: ["CI/CD", "Docker", "Version Control (Git)", "Jira"],
    description: "Automating deployment and infrastructure management"
  },
  {
    category: "ML & Automation",
    icon: BrainCircuit,
    color: "from-pink-500 to-rose-400",
    items: [
      "Python",
      "Data Structures And Algorithms", 
      "Deep Learning",
      "APIs and Automation",
      "Object-Oriented Programming",
      "GUI Automation",
      "Web Scraping",
    ],
    description: "Building intelligent systems and automation solutions"
  },
  {
    category: "System Design",
    icon: Cpu,
    color: "from-indigo-500 to-blue-400",
    items: [
      "Microservices",
      "Scalability", 
      "Performance",
      "Architecture",
      "Design Patterns",
      "Design Views",
      "Databases",
    ],
    description: "Architecting scalable, maintainable software systems"
  },
];

const titleVariants = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const subtitleVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: { 
    opacity: 0,
    y: 80,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export default function Skills() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const titleControls = useAnimation();
  const subtitleControls = useAnimation();
  const containerControls = useAnimation();
  
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
    amount: 0.1,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  useEffect(() => {
    if (isInView) {
      titleControls.start("animate");
      subtitleControls.start("animate");
      containerControls.start("animate");
    }
  }, [isInView, titleControls, subtitleControls, containerControls]);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden bg-gray-900"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(14, 165, 233, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
        `
      }}
    >
      {/* Animated background mesh */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-violet-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </motion.div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16 sm:mb-20">
            <motion.div
              variants={titleVariants}
              initial="initial" 
              animate={titleControls}
              className="mb-6"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 text-transparent bg-clip-text leading-tight">
                TECHNICAL
                <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 text-transparent bg-clip-text">
                  EXPERTISE
                </span>
              </h2>
            </motion.div>
            
            <motion.p
              variants={subtitleVariants}
              initial="initial"
              animate={subtitleControls}
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Transforming ideas into scalable digital solutions with cutting-edge technologies
            </motion.p>
          </div>

          {/* Desktop/Tablet: Staggered Cards */}
          <div className="hidden md:block">
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate={containerControls}
              className="space-y-8"
            >
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className={`flex items-center gap-8 ${isEven ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-full max-w-2xl ${isEven ? 'order-1' : 'order-2'}`}>
                      <motion.div
                        whileHover={{ 
                          scale: 1.02,
                          rotateY: isEven ? 2 : -2,
                        }}
                        onHoverStart={() => setActiveCard(index)}
                        onHoverEnd={() => setActiveCard(null)}
                        className="group relative p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 
                          border border-white/10 hover:border-white/20 transition-all duration-500
                          shadow-xl hover:shadow-2xl hover:shadow-violet-500/20"
                      >
                        {/* Glow effect */}
                        <motion.div 
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                        />
                        
                        <div className="relative z-10">
                          <div className="flex items-start gap-6 mb-6">
                            <motion.div
                              whileHover={{ scale: 1.1, rotateZ: 360 }}
                              transition={{ duration: 0.6, type: "spring" }}
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} p-4 shadow-lg flex-shrink-0`}
                            >
                              <Icon className="w-full h-full text-white" />
                            </motion.div>
                            
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                                {skill.category}
                              </h3>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                {skill.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            {skill.items.map((item, i) => (
                              <motion.span
                                key={i}
                                whileHover={{ 
                                  scale: 1.05,
                                  y: -2,
                                }}
                                onHoverStart={() => setHoveredTag(item)}
                                onHoverEnd={() => setHoveredTag(null)}
                                className={`
                                  px-4 py-2 text-sm font-medium rounded-xl cursor-pointer
                                  transition-all duration-300 select-none
                                  ${hoveredTag === item
                                    ? `bg-gradient-to-r ${skill.color} text-white shadow-lg shadow-current/30 transform -translate-y-1`
                                    : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                                  }
                                `}
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Decorative corner accent */}
                        <motion.div
                          className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br ${skill.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Connector line */}
                    <div className={`hidden lg:block w-32 h-px bg-gradient-to-r ${skill.color} opacity-30 ${isEven ? 'order-2' : 'order-1'}`} />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Mobile: Horizontal Scrolling Cards */}
          <div className="md:hidden">
            <motion.div
              variants={subtitleVariants}
              initial="initial"
              animate={subtitleControls}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Swipe to explore</span>
              </div>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate={containerControls}
              className="overflow-x-auto pb-6"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <div className="flex gap-6 w-max px-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  
                  return (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      className="w-80 flex-shrink-0"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        onTouchStart={() => setActiveCard(index)}
                        onTouchEnd={() => setActiveCard(null)}
                        className={`
                          relative p-6 rounded-2xl backdrop-blur-xl h-full
                          transition-all duration-500 touch-manipulation
                          ${activeCard === index
                            ? 'bg-gradient-to-br from-white/15 to-white/5 border-white/30 shadow-2xl shadow-violet-500/30'
                            : 'bg-gradient-to-br from-white/10 to-white/5 border-white/10 shadow-xl'
                          }
                          border
                        `}
                      >
                        {/* Dynamic background glow */}
                        <motion.div 
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} transition-opacity duration-500 ${activeCard === index ? 'opacity-20' : 'opacity-0'}`}
                        />
                        
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-center gap-4 mb-6">
                            <motion.div
                              animate={{
                                rotate: activeCard === index ? 360 : 0,
                                scale: activeCard === index ? 1.1 : 1,
                              }}
                              transition={{ duration: 0.6, type: "spring" }}
                              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} p-3 shadow-lg`}
                            >
                              <Icon className="w-full h-full text-white" />
                            </motion.div>
                            
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white leading-tight">
                                {skill.category}
                              </h3>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            {skill.description}
                          </p>
                          
                          {/* Skills */}
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {skill.items.slice(0, 3).map((item, i) => (
                                <motion.span
                                  key={i}
                                  whileTap={{ scale: 0.95 }}
                                  onTouchStart={() => setHoveredTag(item)}
                                  onTouchEnd={() => setHoveredTag(null)}
                                  className={`
                                    px-3 py-1.5 text-xs font-medium rounded-lg
                                    transition-all duration-300 touch-manipulation
                                    ${hoveredTag === item
                                      ? `bg-gradient-to-r ${skill.color} text-white shadow-md`
                                      : 'bg-white/10 text-gray-300'
                                    }
                                  `}
                                >
                                  {item}
                                </motion.span>
                              ))}
                            </div>
                            
                            {skill.items.length > 3 && (
                              <motion.div
                                animate={{ 
                                  maxHeight: activeCard === index ? 200 : 0,
                                  opacity: activeCard === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {skill.items.slice(3).map((item, i) => (
                                    <motion.span
                                      key={i}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ 
                                        opacity: activeCard === index ? 1 : 0,
                                        y: activeCard === index ? 0 : 10,
                                      }}
                                      transition={{ delay: i * 0.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 text-gray-300 touch-manipulation"
                                    >
                                      {item}
                                    </motion.span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                          
                          {skill.items.length > 3 && (
                            <motion.div 
                              className="mt-4 text-center"
                              animate={{ 
                                opacity: activeCard === index ? 0 : 1,
                              }}
                            >
                              <span className="text-xs text-gray-500">
                                Tap to see more • {skill.items.length - 3} more skills
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Scroll indicator */}
              <div className="flex justify-center mt-6 gap-2">
                {skills.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeCard === index ? 'bg-violet-400 w-8' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating action hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="fixed bottom-8 right-8 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full 
              bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10
              text-gray-300 text-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Hover to explore
          </motion.div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
    </div>
  );
}