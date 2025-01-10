import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building2, CheckCircle } from 'lucide-react';
{/* Links are commented out for now. */}
const certifications = [
  {
    title: 'Seize the Moment: Software Development Training',
    issuer: 'Ontario Tech University via Brilliant Catalyst',
    date: 'October 2024',
    description: 'A comprehensive course on software development covering methodologies like Waterfall and Agile, coding skills, cloud computing, software testing, and version control for effective project management.',
    url: 'https://verified.sertifier.com/en/verify/51757711823358/'
  },
  {
    title: 'Harvard CS50x: Introduction to Computer Science',
    issuer: 'Harvard University via edX',
    date: 'January 2025',
    description: 'A comprehensive introduction to computer science covering programming fundamentals, algorithms, data structures, Artificial intelligence, Deep learning and web development using languages like C, Python, SQL, and JavaScript.',
    url: 'https://pll.harvard.edu/course/cs50-introduction-computer-science'
  },
  {
    title: 'Python Bootcamp: From Zero to Hero in Python',
    issuer: 'Udemy',
    date: 'August 2020',
    description: 'An in-depth course covering Python fundamentals, object-oriented programming, data structures, and other advanced techniques including real-world applications for automation and data processing.',
    url: 'https://www.udemy.com/certificate/UC-87877d62-3c66-4547-a35b-da992f714ddb/'
  },
  {
    title: 'Harvard CS50: Introduction to Artificial Intelligence with Python',
    issuer: 'Harvard University via edX',
    date: 'December 2024',
    description: 'Explored foundational concepts of artificial intelligence, including graph search algorithms, machine learning, reinforcement learning, and optimization. Built intelligent systems and applications using Python and machine learning libraries, with a focus on technologies like game-playing engines, recommendation systems, and handwriting recognition.',
    url: 'https://pll.harvard.edu/course/cs50s-introduction-artificial-intelligence-python'
  },
  {
    title: 'Harvard CS50W: Web Programming with Python and JavaScript',
    issuer: 'Harvard University via edX',
    date: 'Currently Enrolled',
    description: 'Developed web applications using HTML, CSS, JavaScript, Python, and Django. Worked on database design, API integration, scalability, security, and user experience. Leveraged tools like Git, Heroku, and SQL to design, implement, and deploy dynamic, scalable web applications.',
    url: 'https://pll.harvard.edu/course/cs50s-web-programming-python-and-javascript'
  }
];

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
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const glowVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Certifications() {
  return (
    <div className="w-full py-20 bg-black/50 backdrop-blur-sm overflow-hidden relative">
      {/* Top Gradient to Match Section Above */}
      <motion.div
        className="absolute top-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Animated background glow effects */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-[100px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[100px]"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* New Phased Background Animation */}
      <motion.div
        className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-20">
        {/* Animated heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Award className="w-10 h-10 text-violet-400" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              CERTIFICATIONS
            </h2>
          </motion.div>
          <motion.div 
            className="h-1 w-24 bg-violet-400 mx-auto mt-4 rounded-full"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
        </motion.div>
        
        {/* Certificates grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative group"
                layout
              >
                {/* Card glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-purple-800/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={{ scale: [0.9, 1.1, 0.9] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 rounded-xl border border-gray-700 hover:border-violet-400/50 transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                  <motion.div 
                    className="flex-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <motion.div 
                        className="flex items-center gap-2 text-gray-400"
                        whileHover={{ x: 5 }}
                      >
                        <Building2 className="w-4 h-4" />
                        <p className="text-sm">{cert.issuer}</p>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 text-gray-400"
                        whileHover={{ x: 5 }}
                      >
                        <Calendar className="w-4 h-4" />
                        <p className="text-sm">{cert.date}</p>
                      </motion.div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </motion.div>
                  
                  {/* <motion.a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 text-violet-400 hover:text-violet-300 transition-colors duration-300 group/link"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-sm font-medium">View Certificate</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </motion.a> */}

                  {/* Completion indicator */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <CheckCircle className="w-5 h-5 text-violet-400" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
