import React from 'react';
import ScrollReveal from '../animations/ScrollReveal';

export default function Instructor() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Meet Your Instructor
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Instructor Photo */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {/* Placeholder for instructor photo */}
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
                    </div>
                  </div>
                </div>

                {/* Instructor Details */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Anuj Kumar
                  </h3>
                  <p className="text-xl text-blue-600 font-semibold mb-4">
                    Senior Software Engineer & Tech Lead
                  </p>
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    <p>
                      With over 10 years of experience in software development and technical leadership, 
                      John has worked at top-tier companies including Google, Microsoft, and several 
                      successful startups. He specializes in full-stack development, system architecture, 
                      and team management.
                    </p>
                    <p>
                      John is passionate about mentoring the next generation of technical leaders and 
                      has helped hundreds of engineers advance their careers through practical, 
                      hands-on learning approaches. His expertise spans across modern web technologies, 
                      AI/ML implementations, and scalable system design.
                    </p>
                    <p>
                      He holds a Master&apos;s degree in Computer Science from Stanford University and 
                      is a certified AWS Solutions Architect. When not coding or teaching, John 
                      enjoys contributing to open-source projects and speaking at tech conferences.
                    </p>
                  </div>
                  
                  {/* Credentials/Badges */}
                  <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      10+ Years Experience
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Stanford Graduate
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      AWS Certified
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      500+ Students Mentored
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