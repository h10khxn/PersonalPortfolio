import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// Technology data with official SVG URLs
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
];

export default function TechWheel() {
  const scrollContainerRef = useRef(null);
  const controls = useAnimation();

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      controls.start({
        x: 0,
        transition: { duration: 0 },
      });

      controls.start({
        x: "-100%",
        transition: {
          repeat: Infinity,
          duration: 15, // Adjust speed as needed
          ease: "linear",
        },
      });
    };

    startAutoScroll();
  }, [controls]);

  return (
    <div className="w-full py-20 bg-black/50 backdrop-blur-sm overflow-hidden">
      <h2 className="text-center text-3xl font-bold text-white mb-8">
        TECHNOLOGIES
      </h2>

      <div
        className="max-w-7xl mx-auto overflow-hidden relative"
        ref={scrollContainerRef}
      >
        <motion.div
          className="flex gap-8"
          animate={controls}
          style={{ willChange: "transform" }}
        >
          {Array(2)
            .fill(technologies)
            .flat()
            .map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2 min-w-[120px] py-4"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-xl">
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className="w-16 h-16 object-contain" // Larger size for logos
                  />
                </div>
                <span className="text-sm text-gray-400">{tech.name}</span>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
