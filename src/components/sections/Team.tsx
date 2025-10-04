"use client";

import React from 'react';
import Image from 'next/image';
import ScrollReveal from '../animations/ScrollReveal';
import StaggerReveal from '../animations/StaggerReveal';
import { landingPageConfig } from '@/config/landingPageConfig';

export default function Team() {
  const { team } = landingPageConfig;

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <ScrollReveal direction="up" duration={0.6}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {team.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              {team.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
        </ScrollReveal>

        {/* Team Grid */}
        <StaggerReveal staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur rounded-2xl shadow-xl border border-gray-700/40 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-500/40"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300"></div>
                
                <div className="relative p-6 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-gray-700/60 group-hover:ring-blue-500/60 transition-all duration-300">
                      {member.avatar ? (
                        <Image
                          src={member.avatar}
                          alt={`${member.name} avatar`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-lg text-blue-400 font-medium mb-4">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 text-left">
                    {member.bio}
                  </p>

                  {/* Credentials */}
                  {member.credentials && member.credentials.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {member.credentials.map((credential, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800/70 border border-gray-600/40 text-gray-200 group-hover:border-blue-500/40 transition-colors duration-300"
                        >
                          {credential}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Social Links */}
                  {member.socialLinks && (
                    <div className="flex gap-4 mt-auto pt-4 border-t border-gray-700/40">
                      {member.socialLinks.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a
                          href={member.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                          aria-label="Twitter"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.github && (
                        <a
                          href={member.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                          aria-label="GitHub"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </StaggerReveal>

        {/* Call to Action */}
        <ScrollReveal direction="up" duration={0.6} delay={0.4}>
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-gray-600/30">
              <p className="text-gray-300 text-lg mb-4">
                Want to join our team and help shape the future of tech education?
              </p>
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
