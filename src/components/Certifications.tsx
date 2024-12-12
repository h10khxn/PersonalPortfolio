import React from 'react';
import { motion } from 'framer-motion';

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
    date: 'Currently Enrolled',
    description: 'A comprehensive introduction to computer science covering programming fundamentals, algorithms, data structures, Aritificial intelligence, Deep learning and web development using languages like C, Python, SQL, and JavaScript.',
    url: 'https://pll.harvard.edu/course/cs50-introduction-computer-science'
  },
  {
    title: 'Python Bootcamp: From Zero to Hero in Python',
    issuer: 'Udemy',
    date: 'August 2020',
    description: 'An in-depth course covering Python fundamentals, object-oriented programming, data structures, and other advanced techniques including real-world applications for automation and data processing.',
    url: 'https://www.udemy.com/certificate/UC-87877d62-3c66-4547-a35b-da992f714ddb/'
  }
];

export default function Certifications() {
  return (
    <div className="w-full py-20 bg-black/50 backdrop-blur-sm overflow-hidden">
      {/* Heading */}
      <h2 className="text-center text-3xl font-bold text-white mb-8 glow">
        CERTIFICATIONS
      </h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(138, 43, 226, 0.6)",
              borderColor: "rgba(138, 43, 226, 0.6)"
            }}
            viewport={{ once: true }}
            onTouchStart={(e) => e.currentTarget.classList.add("active")}
            onTouchEnd={(e) => e.currentTarget.classList.remove("active")}
          >
            {/* Neon Border Effect */}
            <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-transparent transition-all duration-300"></div>

            <h3 className="text-xl font-semibold text-violet-400">{cert.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
            <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
            <p className="text-sm text-gray-300 mt-4">{cert.description}</p>
            <a 
              href={cert.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-4 text-sm text-violet-400 hover:underline"
            >
              View Certificate
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
