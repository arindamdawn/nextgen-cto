"use client";

import React from 'react';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import { Button } from '@/components/ui/button';
import { smoothScrollTo, fadeInUp, staggerContainer } from '@/lib/utils';

export default function Hero() {
  const handleJoinWaitlist = () => {
    smoothScrollTo('waitlist');
  };

  const videoOptions = {
    height: '315',
    width: '560',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  const backgroundAnimation = {
    background: [
      'linear-gradient(45deg, #3B82F6, #1D4ED8)',
      'linear-gradient(45deg, #1D4ED8, #8B5CF6)',
      'linear-gradient(45deg, #8B5CF6, #3B82F6)',
      'linear-gradient(45deg, #3B82F6, #1D4ED8)',
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear' as const,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={backgroundAnimation}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
      
      {/* Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          {/* Hero Text */}
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Master Code, Design, AI & Leadership —{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Become the CTO of Tomorrow
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the next generation of technical leaders with comprehensive courses 
              designed to build well-rounded CTOs who excel in every aspect of technology leadership.
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div 
            className="mb-12 flex justify-center"
            variants={fadeInUp}
          >
            <div className="relative w-full max-w-4xl">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                <YouTube
                  videoId="hw2nv3jIgZs"
                  opts={{
                    ...videoOptions,
                    width: '100%',
                    height: '100%',
                  }}
                  className="w-full h-full"
                  iframeClassName="w-full h-full"
                  title="Biggest DSA in Java Course"
                />
              </div>
              
              {/* Video Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10" />
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="text-center"
            variants={fadeInUp}
          >
            <Button
              onClick={handleJoinWaitlist}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Join the Waitlist
            </Button>
            <p className="text-gray-500 mt-4 text-sm">
              Be the first to know when courses launch
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}