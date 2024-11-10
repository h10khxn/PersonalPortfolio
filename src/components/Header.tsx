import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Header Box */}
      <div className="bg-gray-900/80 backdrop-blur-md py-4 px-8 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold cursor-pointer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="cursor-pointer neon-text transition-all text-violet-500"
            >
              Hamdan Khan
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 text-gray-300 text-sm font-medium">
            {['Home', 'Technologies', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <Link
                  to={item.toLowerCase()}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  activeClass="active-link"
                  className="cursor-pointer neon-text transition-all hover:text-violet-400"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-violet-400">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center space-y-6 py-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {['Home', 'Technologies', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item, index) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={toggleMenu}
                className="text-gray-300 hover:text-violet-400 text-lg font-medium cursor-pointer neon-text transition-all"
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
