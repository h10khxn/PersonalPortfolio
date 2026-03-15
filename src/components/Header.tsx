import { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Code, Briefcase, Cpu, Award, Mail, Home, Building2, Activity } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
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
    { name: 'Experience', icon: Building2 },
    { name: 'Activity', icon: Activity },
    { name: 'Certifications', icon: Award },
    { name: 'Contact', icon: Mail },
  ];

  const slideVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50"
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated gradient border */}
      <div className="h-[3px] bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-500 animate-gradient-x" />

      {/* Header bar */}
      <motion.div
        className="bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/*
          Layout: logo pinned left (flex-shrink-0), then a flex-1 spacer,
          then the nav on the right. This keeps the logo in the corner at
          every viewport width — from 320px phones to 4K TVs.
        */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center h-14 sm:h-16">

          {/* ── Logo — always top-left corner ── */}
          <motion.div
            className="flex-shrink-0 relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Link
              to="home"
              smooth
              duration={500}
              className="text-xl sm:text-2xl font-bold cursor-pointer bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
              onClick={() => setIsOpen(false)}
            >
              Hamdan Khan
            </Link>
            <div className="absolute -bottom-0.5 left-0 h-px w-0 bg-teal-400 group-hover:w-full transition-all duration-300" />
          </motion.div>

          {/* ── Spacer — pushes nav to the right ── */}
          <div className="flex-1" />

          {/*
            Desktop nav — only appears at lg (1024px+) so 7 items have
            enough room and don't squeeze the logo at tablet widths.
          */}
          <motion.nav
            className="hidden lg:flex items-center gap-5 xl:gap-7"
            initial={{ opacity: 0, y: -10 }}
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
                  smooth
                  duration={500}
                  offset={-70}
                  className={`text-sm transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                    activeSection === name.toLowerCase()
                      ? 'text-teal-400'
                      : 'text-gray-300 hover:text-teal-400'
                  }`}
                  onSetActive={() => setActiveSection(name.toLowerCase())}
                >
                  <Icon size={14} className="opacity-70 flex-shrink-0" />
                  {name}
                </Link>
                <div className={`absolute -bottom-0.5 left-0 h-px bg-teal-400 transition-all duration-300 ${
                  activeSection === name.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </motion.div>
            ))}
          </motion.nav>

          {/* ── Hamburger — shown below lg ── */}
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden flex-shrink-0 ml-3 p-2 rounded-lg bg-gray-800/60 text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* ── Mobile / tablet slide-in panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-72 max-w-[85vw] bg-gray-900/97 backdrop-blur-xl shadow-2xl border-l border-gray-800 z-30"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="pt-20 px-5 h-full overflow-y-auto"
            >
              {navItems.map(({ name, icon: Icon }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="mb-2"
                >
                  <Link
                    to={name.toLowerCase()}
                    smooth
                    duration={500}
                    offset={-70}
                    onClick={toggleMenu}
                    className="block"
                  >
                    <motion.div
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-colors duration-200 p-3 rounded-xl hover:bg-gray-800/60"
                    >
                      <Icon size={18} className="text-teal-400 flex-shrink-0" />
                      <span className="font-medium text-sm">{name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
