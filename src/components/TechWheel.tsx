import React, { useRef, useEffect, useMemo } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const technologies = [
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg" },
  { name: "Azure SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" },
];

export default function TechWheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  let autoScrollTimer: number;

  const extendedTechnologies = useMemo(() => {
    return [...technologies, ...technologies, ...technologies];
  }, []);

  const startAutoScroll = () => {
    const scrollWidth = containerRef.current?.scrollWidth || 0;
    const viewportWidth = containerRef.current?.offsetWidth || 0;
    const scrollDistance = -scrollWidth + viewportWidth;

    controls.start({
      x: [0, scrollDistance],
      transition: {
        duration: 50,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  const handleDragStart = () => {
    controls.stop();
    clearTimeout(autoScrollTimer);
  };

  const handleDragEnd = () => {
    clearTimeout(autoScrollTimer);
    autoScrollTimer = window.setTimeout(() => {
      const currentX = x.get();
      controls.start({
        x: currentX,
        transition: { duration: 0 }
      }).then(() => {
        startAutoScroll();
      });
    }, 1000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearTimeout(autoScrollTimer);
  }, []);

  return (
    <div>
      {/* Top Section with gradient */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-white mb-12 tracking-wider">
            TECHNOLOGIES
          </h2>

          <div 
            ref={containerRef}
            className="max-w-7xl mx-auto overflow-hidden relative px-4"
          >
            <motion.div
              className="flex gap-8"
              style={{ x }}
              drag="x"
              dragConstraints={containerRef}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              animate={controls}
              whileTap={{ cursor: "grabbing" }}
            >
              {extendedTechnologies.map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  className="flex flex-col items-center gap-3 min-w-[140px] py-6 px-4"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <div className="w-24 h-24 bg-gray-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 p-4">
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="w-20 h-20 object-contain filter drop-shadow-lg transition-transform duration-300"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-300 tracking-wide">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Section with gradient */}
      <section className="py-20 bg-gradient-to-t from-black to-gray-900">
        {/* Content for the bottom section */}
      </section>
    </div>
  );
}
