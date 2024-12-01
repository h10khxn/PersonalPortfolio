"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal, Repeat } from "lucide-react";
import Card from "./Card"; // Ensure Card component path is correct



// Utility function to combine class names
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}



// Hero Component
export default function Hero() {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const command = "npm install hamdan-khan";

  useEffect(() => {
    if (phase === 0) {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < command.length) {
          setText(command.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setPhase(1), 500);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }

    if (phase === 1) {
      setTimeout(() => setPhase(2), 1000);
    }

    if (phase === 2) {
      setTimeout(() => {
        setPhase(3);
        setShowSuccess(true);
        setTimeout(() => setAnimationComplete(true), 800);
      }, 1000);
    }
  }, [phase]);

  const rerunAnimation = () => {
    setText("");
    setPhase(0);
    setShowSuccess(false);
    setAnimationComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center">

      {/* Background Video */}
      <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
        <source src="/spacevid2.webm" type="video/webm" />
        <source src="/spacevid2.mp4" type="video/mp4" />
      </video>



      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Card component with animated globe */}
      <div className="absolute top-20 left-10 z-0 pointer-events-none">
        <Card />
      </div>

      <div className="relative w-full max-w-5xl md:ml-auto z-10 px-4 md:px-0">
        <motion.div className="animate-fade-in" initial="initial" animate="animate">
          {/* Name with bar under it */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 neon-border flex items-center"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
            variants={{
              initial: { opacity: 0, x: -500 },
              animate: { opacity: 1, x: 0, transition: { duration: 1 } },
            }}
          >
            I'm Hamdan Khan
          </motion.h1>
          <div className="w-24 h-1 bg-violet-500 mb-4"></div>

          {/* Terminal animation */}
          <motion.div
            className="bg-black text-green-400 font-mono text-sm rounded-md shadow-lg mt-4 w-full max-w-sm md:absolute md:top-0 md:right-4 md:w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-t-md">
              <span className="text-xs text-gray-300">Terminal</span>
              <button
                onClick={rerunAnimation}
                className="p-1 hover:bg-blue-500/20 rounded-full transition-all"
              >
                <Repeat className="w-4 h-4 text-blue-400" />
              </button>
            </div>

            {/* Terminal content */}
            <div className="p-4">
              <div>$ {text}</div>
              {phase === 1 && <div>Loading packages...</div>}
              {phase === 2 && <div>[====================] 100%</div>}
              {showSuccess && <div>✔ Installation successful!</div>}
            </div>
          </motion.div>

          {/* Subtitle and paragraph */}
          {animationComplete && (
            <>
              <motion.h2
                className="text-xl md:text-2xl text-white-300 mb-6"
                initial={{ opacity: 0, x: 500 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                Software Engineer
              </motion.h2>

              <motion.p
                className="text-white-200 max-w-md md:max-w-2xl mb-6 leading-relaxed"
                initial={{ opacity: 0, x: -500 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                Hello there! Welcome to my portfolio. I'm currently pursuing a degree in Software Engineering.   
                I specialize in building and designing exceptional websites, automated tools,
              applications, and everything in between. I am currently exploring the vast domain of Artifical Intelligence and Machine Learning! Feel free to navigate through to learn more
                about my work.
              </motion.p>

              {/* Social icons */}
              <motion.div
                className="social-icons-container flex gap-4 pointer-events-auto z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <a
                  href="https://github.com/h10khxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors pointer-events-auto"
                >
                  <Github className="w-6 h-6 text-gray-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hamdankhan1704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors pointer-events-auto"
                >
                  <Linkedin className="w-6 h-6 text-gray-300" />
                </a>
                <a
                  href="mailto:hamdan.khan@ontariotechu.net"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors pointer-events-auto"
                >
                  <Mail className="w-6 h-6 text-gray-300" />
                </a>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {/* Terminal icon animation */}
      <motion.div
        className="absolute bottom-5 right-8 w-10 h-10 text-violet-500"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Terminal className="w-10 h-10 text-violet-500" />
      </motion.div>

     
    </div>
  );
}
