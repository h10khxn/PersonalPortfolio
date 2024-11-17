import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  Code2, 
  FileCode, 
  Database, 
  Binary,
  Braces,
  Terminal,
  Brackets,
  CircuitBoard,
  Text,
} from 'lucide-react';

const technologies = [
  { name: 'Java', Icon: Braces },
  { name: 'JavaScript', Icon: Binary },
  { name: 'TypeScript', Icon: Text },
  { name: 'Python', Icon: Terminal },
  { name: 'HTML', Icon: FileCode },
  { name: 'CSS', Icon: Brackets },
  { name: 'SQL', Icon: Database },
  { name: 'C', Icon: Code2 },
  { name: 'C++', Icon: CircuitBoard },
];

export default function TechWheel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if on mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startAutoScroll = () => {
    controls.start({
      x: 0,
      transition: { duration: 0 },
    });

    controls.start({
      x: '-100%',
      transition: {
        repeat: Infinity,
        duration: isMobile ? 20 : 15, // Slower for mobile
        ease: 'linear',
      },
    });
  };

  useEffect(() => {
    startAutoScroll();
  }, [isMobile]);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    startAutoScroll();
  };

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
          drag="x"
          dragConstraints={{ left: -2000, right: 0 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ willChange: 'transform' }} // GPU-accelerated rendering
        >
          {Array(3).fill(technologies).flat().map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2 min-w-[100px] py-4"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl">
                <tech.Icon className="w-8 h-8 text-violet-400" />
              </div>
              <span className="text-sm text-gray-400">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
