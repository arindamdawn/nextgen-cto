"use client";

import React from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import { landingPageConfig } from '@/config/landingPageConfig';

export default function Instructor() {
  const { instructor } = landingPageConfig;
  
  return (
    <div className="container mx-auto px-4">
      <ScrollReveal 
        direction="up" 
        duration={0.8}
        threshold={0.1}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 md:mb-16 px-4">
          {instructor.title}
        </h2>
      </ScrollReveal>
      
      <ScrollReveal 
        delay={0.2} 
        direction="up" 
        duration={0.8}
        threshold={0.1}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-gray-700/50 p-6 sm:p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Instructor Photo */}
              <div className="flex-shrink-0">
                <div className="w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for instructor photo */}
                    {instructor.avatar ? (
                      <img 
                        src={instructor.avatar} 
                        alt={instructor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <svg 
                          className="w-20 h-20 text-gray-500" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Instructor Details */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {instructor.name}
                </h3>
                <p className="text-lg sm:text-xl text-blue-400 font-semibold mb-4">
                  {instructor.role}
                </p>
                
                <div className="text-gray-300 leading-relaxed space-y-4">
                  {instructor.bio.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Credentials/Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 justify-center md:justify-start">
                  {instructor.credentials.map((credential, index) => (
                    <span 
                      key={index}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${credential.color}`}
                    >
                      {credential.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}