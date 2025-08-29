"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Roadmaps from "@/components/sections/Roadmaps";
import Instructor from "@/components/sections/Instructor";
import Testimonials from "@/components/sections/Testimonials";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/sections/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import PageLoader from "@/components/ui/PageLoader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";
import ErrorBoundary from "@/components/ErrorBoundary";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const { isVisible: showScrollTop, scrollToTop } = useScrollToTop(400);
  
  // Performance monitoring
  usePerformanceMonitoring({
    enableLogging: process.env.NODE_ENV === 'development',
    onMetric: (_metric) => {
      // In production, you would send this to your analytics service
      if (process.env.NODE_ENV === 'production') {
        // Example: analytics.track('performance_metric', metric);
      }
    },
  });

  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add scroll padding for smooth navigation
    document.documentElement.style.scrollPaddingTop = '2rem';
    
    // Preload critical resources
    const preloadResources = async () => {
      // Simulate resource loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoaded(true);
    };

    preloadResources();
    
    // Cleanup function to reset scroll behavior
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollPaddingTop = '0';
    };
  }, []);

  const handleLoadComplete = () => {
    setShowLoader(false);
  };

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  return (
    <PerformanceOptimizer enableOptimizations={true}>
      {/* Page Loader */}
      {showLoader && <PageLoader onLoadComplete={handleLoadComplete} />}
      
      <AnimatePresence mode="wait">
        <motion.main 
        className="min-h-screen overflow-x-hidden"
        variants={pageVariants}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        exit="exit"
        key="main-page"
      >
        {/* Scroll Progress Indicator */}
        <ScrollProgress />
        
        {/* Section Navigation */}
        <SectionNavigation />

        {/* Hero Section - Full viewport height */}
        <ErrorBoundary
          fallback={
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
              <div className="text-center p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to NextGen-CTO</h1>
                <p className="text-xl text-gray-600 mb-6">Master Code, Design, AI & Leadership</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </section>
          }
        >
          <section 
            id="hero" 
            className="relative min-h-screen flex items-center justify-center"
          >
            <Hero />
          </section>
        </ErrorBoundary>

        {/* Main Content Sections with proper spacing */}
        <div className="relative z-10">
          {/* Roadmaps Section */}
          <ErrorBoundary>
            <ScrollReveal>
              <section 
                id="roadmaps" 
                className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50"
              >
                <Roadmaps />
              </section>
            </ScrollReveal>
          </ErrorBoundary>

          {/* Instructor Section */}
          <ErrorBoundary>
            <ScrollReveal direction="up" delay={0.2}>
              <section 
                id="instructor" 
                className="py-16 md:py-24 lg:py-32 bg-white"
              >
                <Instructor />
              </section>
            </ScrollReveal>
          </ErrorBoundary>

          {/* Testimonials Section */}
          <ErrorBoundary>
            <ScrollReveal direction="up" delay={0.3}>
              <section 
                id="testimonials" 
                className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white"
              >
                <Testimonials />
              </section>
            </ScrollReveal>
          </ErrorBoundary>

          {/* Waitlist Section */}
          <ErrorBoundary>
            <ScrollReveal direction="up" delay={0.4}>
              <section 
                id="waitlist" 
                className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <Waitlist />
                </div>
              </section>
            </ScrollReveal>
          </ErrorBoundary>
        </div>

        {/* Footer Section */}
        <ScrollReveal direction="up" delay={0.5}>
          <footer className="bg-gray-900 text-white">
            <Footer />
          </footer>
        </ScrollReveal>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              aria-label="Scroll to top"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        </motion.main>
      </AnimatePresence>
    </PerformanceOptimizer>
  );
}