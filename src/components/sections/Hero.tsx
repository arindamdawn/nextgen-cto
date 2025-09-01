"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { smoothScrollTo, fadeInUp, staggerContainer } from '@/lib/utils';
import EnhancedYouTube from '@/components/ui/EnhancedYouTube';
import ErrorBoundary from '@/components/ErrorBoundary';
import { landingPageConfig } from '@/config/landingPageConfig';

export default function Hero() {
  const { hero } = landingPageConfig;
  
  const handleJoinWaitlist = () => {
    smoothScrollTo('waitlist');
  };

  const videoOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      playsinline: 1,
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
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-600 to-purple-600" />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-gray-900/95" />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
              {hero.title.main}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {hero.title.highlight}
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              {hero.subtitle}
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-8 md:mb-12 flex justify-center px-4">
            <div className="relative w-full max-w-4xl">
              <ErrorBoundary
                fallback={
                  <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Temporarily Unavailable</h3>
                      <p className="text-gray-600">Please refresh the page to try again.</p>
                    </div>
                  </div>
                }
              >
                <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl bg-gray-100">
                  <EnhancedYouTube
                    videoId={hero.video.videoId}
                    title={hero.video.title}
                    opts={videoOptions}
                    className="w-full h-full"
                    showLoadingState={true}
                    autoRetry={true}
                    maxRetries={3}
                  />
                </div>
              </ErrorBoundary>
              
              {/* Video Glow Effect */}
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl md:rounded-3xl blur-xl -z-10" />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center px-4">
            <Button
              onClick={handleJoinWaitlist}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              {hero.cta.text}
            </Button>
            <p className="text-gray-400 mt-4 text-sm px-2">
              {hero.cta.subtext}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-500 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}