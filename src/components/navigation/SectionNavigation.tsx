"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  section: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Home', section: 'hero' },
  { id: 'roadmaps', label: 'Roadmaps', section: 'roadmaps' },
  { id: 'instructor', label: 'Instructor', section: 'instructor' },
  { id: 'testimonials', label: 'Reviews', section: 'testimonials' },
  { id: 'waitlist', label: 'Join Waitlist', section: 'waitlist' },
];

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Show navigation after scrolling past hero
      setIsVisible(scrollPosition > window.innerHeight * 0.3);

      // Determine active section
      const sections = navigationItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.section),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    smoothScrollTo(sectionId, 80);
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:block fixed top-8 left-1/2 transform -translate-x-1/2 z-40 bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg border border-gray-600/50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-1 px-2 py-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.section)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.nav>

          {/* Mobile Navigation Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden fixed top-6 right-6 z-50 bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg border border-gray-600/50 p-3 hover:bg-gray-700/90 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-200" />
            )}
          </motion.button>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.nav
                  className="absolute top-20 right-6 bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-600/50 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-2">
                    {navigationItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavClick(item.section)}
                        className={`w-full text-left px-6 py-4 text-base font-medium transition-all duration-300 hover:bg-gray-700/50 ${
                          activeSection === item.id
                            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-r-4 border-blue-500'
                            : 'text-gray-200 hover:text-white'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}