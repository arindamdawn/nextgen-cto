"use client";

import React from 'react';
import Image from 'next/image';
import ScrollReveal from '../animations/ScrollReveal';
import { landingPageConfig } from '@/config/landingPageConfig';

export default function Instructor() {
  const { instructor } = landingPageConfig;

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900">
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
            <div className="relative bg-gray-800/40 backdrop-blur rounded-2xl shadow-2xl border border-gray-700/40 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-12 items-center">

                {/* Avatar Column */}
                <div className="lg:col-span-4 flex justify-center lg:justify-start">
                  <div className="relative -mt-12 lg:mt-0">
                    <div className="rounded-xl p-2 bg-gradient-to-br from-white/3 to-transparent shadow-lg">
                      <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden ring-2 ring-gray-700/60 bg-gradient-to-br from-blue-600 to-purple-600">
                        {instructor.avatar ? (
                          <Image
                            src={instructor.avatar}
                            alt={`${instructor.name} avatar`}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/90">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0 lg:left-0 lg:bottom-auto">
                      <div className="hidden lg:block w-28 h-28 rounded-lg bg-gradient-to-br from-blue-700 to-purple-700 opacity-8 blur-2xl -z-10" />
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-8 text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-lg sm:text-xl text-blue-300 font-medium mb-6">
                    {instructor.role}
                  </p>

                  {/* Key Stats */}
                  <div className="flex flex-col sm:flex-row sm:items-stretch gap-4 mb-6">
                    {(instructor.stats || []).map((stat, idx) => (
                      <div key={idx} className="flex-1 bg-gray-800/60 border border-gray-700/40 rounded-lg p-4 flex flex-col items-center sm:items-start">
                        <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bio */}
                  <div className="text-gray-300 leading-relaxed space-y-4 mb-6 text-left">
                    {instructor.bio.map((paragraph, index) => (
                      <p key={index} className="text-sm sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Credentials / Badges */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {instructor.credentials.map((credential, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium bg-gray-800/50 border border-gray-700/30 text-gray-200 ${credential.color}`}
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

        {/* Bottom Quote/Mission */}
        <ScrollReveal direction="up" duration={0.8} delay={0.4}>
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-6 lg:p-10 border border-gray-600/30">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <blockquote className="text-lg lg:text-xl text-gray-300 italic leading-relaxed">
                    &ldquo;My mission is to democratize high-quality technical education and build a generation of well-rounded technical leaders who can drive innovation at the intersection of technology and business.&rdquo;
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