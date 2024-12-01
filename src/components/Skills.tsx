import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Cloud, Layout, Shield, Cpu,BrainCircuit } from 'lucide-react';

const skills = [
  {
    category: "Frontend Development",
    icon: Layout,
    items: ["HTML", "JavaScript", "TypeScript", "React.js", "Tailwind CSS"],
  },
  {
    category: "Backend Development",
    icon: Code2,
    items: ["Java", "Python", "APIs"],
  },
  {
    category: "Database",
    icon: Database,
    items: ["MySQL", "SQL"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    items: ["CI/CD", "Docker"],
  },
  {
    category: "ML & Automation",
    icon: BrainCircuit,
    items: [      "Python",
      "Data Structures And Algorithms",
      "Deep Learning",
      "APIs and Automation",
      "Object-Oriented Programming",
      "Version Control (Git)",
      "GUI Automation",
      "Web Scraping",],
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

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  const handleTouchStart = (index: number) => {
    setActiveSkill(index);
  };

  const handleTouchEnd = () => {
    setActiveSkill(null);
  };

  return (
    <div>
      {/* Top Section with gradient */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const isActive = activeSkill === index;

              return (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 transition-all duration-300 shadow-md group ${
                    isActive ? "from-violet-600 to-indigo-700 shadow-lg scale-105" : ""
                  } hover:from-violet-600 hover:to-indigo-700 hover:shadow-lg hover:scale-105`}
                  whileHover={{ scale: 1.05 }}
                  onTouchStart={() => handleTouchStart(index)}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-500 shadow-md transition-transform duration-200 ${
                        isActive ? "scale-105" : ""
                      } group-hover:scale-105`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white ml-4">
                      {skill.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skill.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-white/10 text-gray-300 rounded-full hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 transition-all"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
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
