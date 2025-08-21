import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const linkVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 w-[70%] h-[60px] mx-auto backdrop-blur-md fixed top-6 left-0 right-0 z-50 p-6 py-8 flex items-center justify-between rounded-full"
    >
      <div className="logo flex items-center gap-2">
        <img src={Logo} alt="Vortex Logo" />
        <h3 className="text-white text-xl font-bold">Vortex</h3>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex gap-6 transition-colors font-semibold">
          <li>
            <a href="#home" className="text-white hover:text-yellow-500">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-white hover:text-yellow-500">
              About Us
            </a>
          </li>
          <li>
            <a href="#services" className="text-white hover:text-yellow-500">
              Services
            </a>
          </li>
          <li>
            <a href="#projects" className="text-white hover:text-yellow-500">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="text-white hover:text-yellow-500">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-1 z-50"
        onClick={toggleMenu}
      >
        <motion.span
          className="w-6 h-0.5 bg-white"
          animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-white"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-white"
          animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-[150%] left-0 right-0 bg-white/10 backdrop-blur-md md:hidden flex flex-col items-center py-6 rounded-xl z-40"
          >
            <ul className="flex flex-col gap-4 text-center font-semibold">
              <motion.li variants={linkVariants} transition={{ delay: 0.1 }}>
                <a
                  href="#home"
                  className="text-white hover:text-yellow-500"
                  onClick={toggleMenu}
                >
                  Home
                </a>
              </motion.li>
              <motion.li variants={linkVariants} transition={{ delay: 0.2 }}>
                <a
                  href="#about"
                  className="text-white hover:text-yellow-500"
                  onClick={toggleMenu}
                >
                  About Us
                </a>
              </motion.li>
              <motion.li variants={linkVariants} transition={{ delay: 0.3 }}>
                <a
                  href="#services"
                  className="text-white hover:text-yellow-500"
                  onClick={toggleMenu}
                >
                  Services
                </a>
              </motion.li>
              <motion.li variants={linkVariants} transition={{ delay: 0.4 }}>
                <a
                  href="#projects"
                  className="text-white hover:text-yellow-500"
                  onClick={toggleMenu}
                >
                  Projects
                </a>
              </motion.li>
              <motion.li variants={linkVariants} transition={{ delay: 0.5 }}>
                <a
                  href="#contact"
                  className="text-white hover:text-yellow-500"
                  onClick={toggleMenu}
                >
                  Contact Us
                </a>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
