"use client";

import React from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import { landingPageConfig } from '@/config/landingPageConfig';

export default function Instructor() {
  const { instructor } = landingPageConfig;
  
  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <ScrollReveal direction="up" duration={0.6}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {instructor.title}
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <ScrollReveal direction="up" duration={0.8} delay={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  
                  {/* Left Side: Photo + Stats */}
                  <div className="flex flex-col items-center lg:items-start space-y-6">
                    {/* Instructor Photo */}
                    <div className="text-center lg:text-left">
                      <div className="relative inline-block">
                        <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto lg:mx-0">
                          {instructor.avatar ? (
                            <img 
                              src={instructor.avatar} 
                              alt={instructor.name}
                              className="w-full h-full object-cover rounded-full border-3 border-blue-500/60 shadow-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border-3 border-blue-500/60 flex items-center justify-center shadow-lg">
                              <svg 
                                className="w-24 h-24 sm:w-28 sm:h-28 text-blue-400" 
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
                  </div>

                  {/* Right Side: Content */}
                  <div className="text-center lg:text-left">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                      {instructor.name}
                    </h3>
                    <p className="text-xl sm:text-2xl text-blue-400 font-semibold mb-6">
                      {instructor.role}
                    </p>

                    {/* Key Stats - Horizontal Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-8">
                      <div className="text-center lg:text-left p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className="text-2xl lg:text-3xl font-bold text-white">1000+</div>
                        <div className="text-sm text-gray-400">Engineers Mentored</div>
                      </div>
                      <div className="text-center lg:text-left p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className="text-2xl lg:text-3xl font-bold text-white">8+</div>
                        <div className="text-sm text-gray-400">Years Experience</div>
                      </div>
                      <div className="text-center lg:text-left p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className="text-2xl lg:text-3xl font-bold text-white">FAANG</div>
                        <div className="text-sm text-gray-400">Experience</div>
                      </div>
                    </div>

                    {/* Bio - Left Aligned */}
                    <div className="text-gray-300 leading-relaxed space-y-4 mb-8 text-left">
                      {instructor.bio.map((paragraph, index) => (
                        <p key={index} className="text-base lg:text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Credentials */}
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {instructor.credentials.map((credential, index) => (
                        <span 
                          key={index}
                          className={`px-4 py-2 rounded-full text-sm font-medium ${credential.color}`}
                        >
                          {credential.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Quote/Mission */}
        <ScrollReveal direction="up" duration={0.8} delay={0.4}>
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-6 lg:p-10 border border-gray-600/30">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <blockquote className="text-lg lg:text-xl text-gray-300 italic leading-relaxed">
                    "My mission is to democratize high-quality technical education and build a generation of well-rounded technical leaders who can drive innovation at the intersection of technology and business."
                  </blockquote>
                </div>
                <div className="lg:col-span-1">
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-2 justify-center lg:justify-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      Industry Recognition
                    </span>
                    <span className="flex items-center gap-2 justify-center lg:justify-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      Published Content
                    </span>
                    <span className="flex items-center gap-2 justify-center lg:justify-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      Conference Speaker
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}