import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronRight, Code, Briefcase, Cpu, Award, Mail, Home } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Technologies', icon: Code },
    { name: 'Projects', icon: Briefcase },
    { name: 'Skills', icon: Cpu },
    { name: 'Certifications', icon: Award },
    { name: 'Contact', icon: Mail }
  ];

  const slideVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50"
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated gradient border */}
      <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 animate-gradient-x"></div>

      {/* Header Box */}
      <motion.div
        className="bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo - Aligned far left */}
          <motion.div
            className="relative group z-10 mr-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent hover:from-violet-500 hover:to-purple-600 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Hamdan Khan
            </Link>
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300"
              whileHover={{ width: "100%" }}
            />
          </motion.div>

          {/* Desktop Navigation - Aligned right */}
          <motion.nav
            className="hidden md:flex space-x-8 ml-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navItems.map(({ name, icon: Icon }) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link
                  to={name.toLowerCase()}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center gap-1.5"
                  onSetActive={() => setActiveSection(name.toLowerCase())}
                >
                  <Icon size={16} className="opacity-75" />
                  {name}
                </Link>
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </motion.div>
            ))}
          </motion.nav>

          {/* Mobile Menu Button - Aligned far right */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden relative z-20 p-2 rounded-lg bg-gray-800/50 text-gray-300 ml-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-64 bg-gray-900/95 backdrop-blur-lg shadow-xl border-l border-gray-800 z-30"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="pt-20 px-4 h-full overflow-y-auto"
            >
              {navItems.map(({ name, icon: Icon }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4"
                >
                  <Link
                    to={name.toLowerCase()}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    onClick={toggleMenu}
                    className="block"
                  >
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 text-gray-300 hover:text-violet-400 transition-colors duration-300 p-3 rounded-lg hover:bg-gray-800/50"
                    >
                      <Icon size={20} className="text-violet-400" />
                      <span className="font-medium">{name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-20"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
