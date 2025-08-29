"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '@/lib/utils';

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
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50"
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
                    : 'text-gray-600 hover:text-gray-900'
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
      )}
    </AnimatePresence>
  );
}